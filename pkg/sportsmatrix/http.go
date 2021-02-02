package sportsmatrix

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func (s *SportsMatrix) startHTTP() chan error {
	errChan := make(chan error, 1)

	router := mux.NewRouter()

	router.HandleFunc("/screenoff", s.turnScreenOff)
	router.HandleFunc("/screenon", s.turnScreenOn)

	for _, b := range s.boards {
		handlers, err := b.GetHTTPHandlers()
		if err != nil {
			errChan <- err
			return errChan
		}
		for _, h := range handlers {
			s.log.Infof("registering http handler for board %s %s", b.Name(), h.Path)
			router.HandleFunc(h.Path, h.Handler)
		}
	}

	s.server = http.Server{
		Addr:    fmt.Sprintf(":%d", s.cfg.HTTPListenPort),
		Handler: router,
	}

	s.log.Info("Starting http server")
	go func() {
		errChan <- s.server.ListenAndServe()
	}()

	// We could manually manage the listener and check for readiness that way,
	// but laziness instead leads to this arbitrary wait time to let the server
	// get ready or potentially return an error to the channel
	time.Sleep(3 * time.Second)

	return errChan
}

func (s *SportsMatrix) turnScreenOff(respWriter http.ResponseWriter, req *http.Request) {
	s.screenOff <- true
}

func (s *SportsMatrix) turnScreenOn(respWriter http.ResponseWriter, req *http.Request) {
	s.screenOn <- true
}