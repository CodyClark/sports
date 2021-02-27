package config

import (
	"github.com/robbydyer/sports/pkg/clock"
	"github.com/robbydyer/sports/pkg/imageboard"
	"github.com/robbydyer/sports/pkg/sportboard"
	"github.com/robbydyer/sports/pkg/sportsmatrix"
	"github.com/robbydyer/sports/pkg/sysboard"
	"github.com/robbydyer/sports/pkg/weather"
)

// Config holds configuration for the RGB matrix and all of its supported Boards
type Config struct {
	EnableNHL          bool                 `json:"enableNHL,omitempty"`
	NHLConfig          *sportboard.Config   `json:"nhlConfig,omitempty"`
	MLBConfig          *sportboard.Config   `json:"mlbConfig,omitempty"`
	NCAAMConfig        *sportboard.Config   `json:"ncaamConfig,omitempty"`
	ImageConfig        *imageboard.Config   `json:"imageConfig"`
	ClockConfig        *clock.Config        `json:"clockConfig"`
	SysConfig          *sysboard.Config     `json:"sysConfig"`
	SportsMatrixConfig *sportsmatrix.Config `json:"sportsMatrixConfig,omitempty"`
	WeatherConfig      *weather.Config      `json:"weatherConfig,omitempty"`
}
