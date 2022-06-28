# WebQuake

Web application for showing seimsograph data in real-time and on demand (historic search).

Built with Python 3, TypeScript, React.js and based on the SeedLink.

## Table of Contents

- [Project structure](#project-structure)
- [Acknowledgments](#acknowledgements)

## Project structure

The project is divided into 2 components:

### Connector

The connector is a small Python client that enables data retrieving from the seismograph server,
using SeedLink the de-facto standard protocol for seismic tool querying.

This runs as a separate process in background and acts as a broker for data relaying in the way
it transfers waveforms to open clients in real-time.

### Web Interface

This is the actual interface that will be shown to the user. It's a static app built with user-side
rendering thanks to React.js. The app communicates with the _Connector_ through WebSockets.

## Acknowledgements

The following technologies are used in this project:

- Python 3
