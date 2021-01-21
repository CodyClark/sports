package sportsmatrix

import (
	"context"
	"image"
	_ "image/png"
	"os"
	"path/filepath"
	"time"

	//rgb "github.com/mcuadros/go-rpi-rgb-led-matrix"
	rgb "github.com/fcjr/rgbmatrix-rpi"

	"github.com/robbydyer/sports/pkg/nhl"
)

type SportsMatrix struct {
	nhlAPI  *nhl.Nhl
	cfg     *Config
	matrix  rgb.Matrix
	canvas  *rgb.Canvas
	toolkit *rgb.ToolKit
}

type Config struct {
	EnableNHL bool
}

func New(ctx context.Context, cfg Config) (*SportsMatrix, error) {
	s := &SportsMatrix{
		cfg: &cfg,
	}

	var err error

	if cfg.EnableNHL {
		s.nhlAPI, err = nhl.New(ctx)
		if err != nil {
			return nil, err
		}
	}

	c := &rgb.HardwareConfig{
		Rows:       64,
		Cols:       32,
		Brightness: 60,
	}
	s.matrix, err = rgb.NewRGBLedMatrix(c)

	s.canvas = rgb.NewCanvas(s.matrix)

	s.toolkit = rgb.NewToolKit(s.matrix)

	return s, nil
}

func (s *SportsMatrix) Close() {
	_ = s.canvas.Close()
	_ = s.matrix.Close()
	_ = s.toolkit.Close()
}

func (s *SportsMatrix) RenderGoal() error {
	p, err := filepath.Abs("../../images/goal_light.png")
	if err != nil {
		return err
	}
	r, err := os.Open(p)
	if err != nil {
		return err
	}
	img, _, err := image.Decode(r)
	if err != nil {
		return err
	}

	return s.toolkit.PlayImage(img, 60*time.Second)
}
