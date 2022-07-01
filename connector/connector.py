import logging
from matplotlib.pyplot import plot
from obspy.clients.seedlink.easyseedlink import EasySeedLinkClient
from obspy.core import Trace, Stream
from obspy.core.utcdatetime import UTCDateTime

from timer import Timer

import threading
import queue

PLOT_REFRESH_INTERVAL = 5
WINDOW_INTERVAL = 60


waves = queue.Queue()


class WindowClient(EasySeedLinkClient):
    def __init__(self, server_url, plot_refresh=PLOT_REFRESH_INTERVAL, window=WINDOW_INTERVAL):
        super().__init__(server_url)
        self.window = window
        self.plot_timer = Timer(plot_refresh)
        self.stream = Stream()


    def on_data(self, trace: Trace):
        logging.debug(trace)
        self.stream += trace

        if self.plot_timer.elapsed():
            self.produce_plots()


    def slice_window(self):
        now = UTCDateTime.now()
        self.stream = self.stream.slice(now - self.window, now)

    def merge_traces(self):
        self.stream.merge()

    def produce_plots(self):
        self.merge_traces()
        self.slice_window()
        self.relay_waveform()

    
    def relay_waveform(self):
        updated_wave = self.stream.copy()
        waves.put(updated_wave)
        print(updated_wave)


def main():

    client = WindowClient('localhost:18000')
    client.select_stream("IV", "CAVE", "HH?")

    client.run()


if __name__ == '__main__':
    main()