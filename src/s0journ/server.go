package main

import (
	"flag"
	"fmt"
	"github.com/go-martini/martini"
	"log"
	"net/http"
	"os"
)

var m *martini.Martini

var contentDir string

var logFile = "s0journ.log"

func init() {
	setContentDirectory()

	m = martini.New()

	m.Use(martini.Recovery())

	m.Use(martini.Static(contentDir))

	m.Map(GetLogger())
}

func setContentDirectory() {
	flag.StringVar(&contentDir, "cd", ".", "content directory")

	flag.Parse()
}

func main() {
	port := "4732"

	hostname, _ := os.Hostname()

	fmt.Println("[", hostname, "] : starting s0journ Server...! [listening on port ", port, "]")

	error := http.ListenAndServe(":"+port, m)

	fmt.Printf("Exited with error... ", error)
}

func GetLogger() *log.Logger {
	file, err := OpenFile("/var/log/s0journ/" + logFile)
	if err != nil {
		file, err = OpenFile(logFile)
	}

	return log.New(file,
		"INFO: ",
		log.Ldate|log.Ltime|log.Lshortfile)
}

func OpenFile(path string) (file *os.File, err error) {
	return os.OpenFile(path, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
}
