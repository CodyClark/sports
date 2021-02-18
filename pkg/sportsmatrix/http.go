package sportsmatrix

import (
	"embed"
	"fmt"
	"io/fs"
	"net/http"
	"path/filepath"
	"strings"
	"time"

	"github.com/gorilla/mux"
	"go.uber.org/zap"

	"github.com/robbydyer/sports/pkg/board"
)

//go:embed assets
var assets embed.FS

// EmbedDir is a wrapper to return index.html by default
type EmbedDir struct {
	http.FileSystem
}

// Open implementation of http.FileSystem that falls back to serving /index.html
func (d EmbedDir) Open(name string) (http.File, error) {
	if f, err := d.FileSystem.Open(name); err == nil {
		return f, nil
	}

	return d.FileSystem.Open("/index.html")
}

func (s *SportsMatrix) startHTTP() chan error {
	errChan := make(chan error, 1)

	router := mux.NewRouter()

	s.httpEndpoints = append(s.httpEndpoints,
		"/api/screenoff",
		"/api/screenon",
	)

	router.HandleFunc("/api/screenoff", s.turnScreenOff)
	router.HandleFunc("/api/screenon", s.turnScreenOn)

	register := func(name string, h *board.HTTPHandler) {
		if !strings.HasPrefix(h.Path, "/api") {
			h.Path = filepath.Join("/api", h.Path)
		}
		s.log.Info("registering http handler", zap.String("name", name), zap.String("path", h.Path))
		router.HandleFunc(h.Path, h.Handler)
		s.httpEndpoints = append(s.httpEndpoints, h.Path)
	}

	for _, b := range s.boards {
		handlers, err := b.GetHTTPHandlers()
		if err != nil {
			errChan <- err
			return errChan
		}
		for _, h := range handlers {
			register(b.Name(), h)
		}
	}

	for _, c := range s.canvases {
		handlers, err := c.GetHTTPHandlers()
		if err != nil {
			errChan <- err
			return errChan
		}
		for _, h := range handlers {
			register(c.Name(), h)
		}
	}

	// Ensure we didn't dupe any endpoints
	dupe := make(map[string]struct{}, len(s.httpEndpoints))
	for _, e := range s.httpEndpoints {
		if _, exists := dupe[e]; exists {
			errChan <- fmt.Errorf("duplicate HTTP endpoint '%s'", e)
			return errChan
		}
		dupe[e] = struct{}{}
	}

	if s.cfg.ServeWebUI {
		filesys := fs.FS(assets)
		web, err := fs.Sub(filesys, "assets/web")
		if err != nil {
			s.log.Error("failed to get sub filesystem", zap.Error(err))
			errChan <- err
			return errChan
		}
		s.log.Info("serving web UI", zap.Int("port", s.cfg.HTTPListenPort))
		router.PathPrefix("/").Handler(http.FileServer(EmbedDir{http.FS(web)}))
	}

	s.server = http.Server{
		Addr:    fmt.Sprintf(":%d", s.cfg.HTTPListenPort),
		Handler: router,
	}

	s.log.Info("Starting http server")
	go func() {
		errChan <- s.server.ListenAndServe()
	}()

	time.Sleep(1 * time.Second)

	return errChan
}

func (s *SportsMatrix) turnScreenOff(respWriter http.ResponseWriter, req *http.Request) {
	s.Lock()
	defer s.Unlock()
	s.screenOff <- struct{}{}
}

func (s *SportsMatrix) turnScreenOn(respWriter http.ResponseWriter, req *http.Request) {
	s.Lock()
	defer s.Unlock()
	s.screenOn <- struct{}{}
}
