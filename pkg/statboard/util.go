package statboard

import (
	"context"
	"fmt"
	"image"
	"image/draw"
	"math"
	"strings"

	"go.uber.org/zap"

	"github.com/robbydyer/sports/pkg/board"
	"github.com/robbydyer/sports/pkg/rgbrender"
)

const padSize = float64(0.005)

func (s *StatBoard) getWriter(bounds image.Rectangle) (*rgbrender.TextWriter, error) {
	s.Lock()
	defer s.Unlock()

	k := fmt.Sprintf("%dx%d", bounds.Dx(), bounds.Dy())
	w, ok := s.writers[k]
	if ok {
		s.log.Debug("using cached writer")
		return w, nil
	}

	writer, err := rgbrender.DefaultTextWriter()
	if err != nil {
		return nil, err
	}

	writer.FontSize = getReadableFontSize(bounds)

	writer.YStartCorrection = (-1 * int(padSize*float64(bounds.Dy()))) + writer.YStartCorrection

	s.log.Debug("statboard writer font",
		zap.Float64("size", writer.FontSize),
		zap.String("canvas", fmt.Sprintf("%dx%d", bounds.Dx(), bounds.Dy())),
		zap.Int("Y correction", writer.YStartCorrection),
	)

	s.writers[k] = writer

	return writer, nil
}

func getReadableFontSize(bounds image.Rectangle) float64 {
	if bounds.Dx() > 128 {
		return 0.05 * float64(bounds.Dx())
	}

	return 0.125 * float64(bounds.Dx())
}

func getGridRatios(writer StringMeasurer, canvas draw.Image, strs []string) ([]float64, error) {
	widths, err := writer.MeasureStrings(canvas, strs)
	if err != nil {
		return nil, err
	}

	ratios := []float64{}

	total := 0
	for i, w := range widths {
		if total > canvas.Bounds().Dx() {
			break
		}
		ratios[i] = float64(float64(w) / float64(canvas.Bounds().Dx()))
		total += w
	}

	return ratios, nil
}

func (s *StatBoard) getStatGrid(ctx context.Context, canvas board.Canvas, players []Player, writer *rgbrender.TextWriter, stats []string) (*rgbrender.Grid, error) {
	maxStat := ""
	maxName := ""

	statCols := make([]string, len(stats))

	for _, player := range players {
		select {
		case <-ctx.Done():
			return nil, context.Canceled
		default:
		}

		if len(player.LastName()) > len(maxName) {
			maxName = player.LastName()
		}

		for i, stat := range stats {
			val := player.GetStat(stat)
			if len(val) > len(statCols[i]) {
				statCols[i] = val
			}
			if len(stat) > len(statCols[i]) {
				statCols[i] = stat
			}
		}
	}

	s.log.Debug("max strings",
		zap.Int("namelen", len(maxName)),
		zap.String("name", maxName),
		zap.Int("statlen", len(maxStat)),
		zap.String("stat", maxStat),
	)

	nameMax := maxNameLength(canvas.Bounds())

	if len(maxName) > nameMax {
		maxName = strings.Repeat("x", nameMax)
	}

	widths, err := writer.MeasureStrings(canvas, []string{maxName, maxStat})
	if err != nil {
		return nil, err
	}

	if len(widths) != 2 {
		return nil, fmt.Errorf("unexpected number of measurements, got %d expected %d", len(widths), 2)
	}

	if widths[0] <= 0 || widths[1] <= 0 {
		err := fmt.Errorf("failed to determine stat cell size")
		s.log.Error(err.Error(),
			zap.Int("name size", widths[0]),
			zap.Int("stat size", widths[1]),
		)
		return nil, err
	}

	x := canvas.Bounds().Dx() - widths[0]

	numStats := x / widths[1]
	if numStats > len(stats) {
		numStats = len(stats)
	}
	cellXRatios := make([]float64, numStats+1)

	cellXRatios[0] = float64(widths[0]) / float64(canvas.Bounds().Dx())

	statWidths := float64(1.0-cellXRatios[0]) / float64(numStats)

	for i := range cellXRatios {
		if i == 0 {
			continue
		}
		cellXRatios[i] = statWidths
	}

	numRows := int(math.Floor((float64(canvas.Bounds().Dy()) / writer.FontSize)))

	cellYRatios := make([]float64, numRows)

	rowHeight := (float64(canvas.Bounds().Dy()) / float64(numRows)) / float64(canvas.Bounds().Dy())

	for i := range cellYRatios {
		cellYRatios[i] = rowHeight
	}

	return rgbrender.NewGrid(
		canvas,
		numStats+1,
		numRows,
		s.log,
		rgbrender.WithPadding(padSize),
		rgbrender.WithCellRatios(cellXRatios, cellYRatios),
	)
}

func maxNameLength(canvas image.Rectangle) int {
	return canvas.Dx() / 4
}

func maxedStr(str string, max int) string {
	if max <= 0 || len(str) < max {
		return str
	}

	start := float64(float64(max-2) / 2)
	i := int(start)
	j := int(start)
	if math.Trunc(start) != start {
		i = int(math.Ceil(start))
		j = int(math.Floor(start))
	}

	return fmt.Sprintf("%s..%s", str[0:i], str[len(str)-j:])
}
