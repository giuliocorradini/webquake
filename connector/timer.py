import time

class Timer:
    '''
    :param interval: fire time in seconds
    '''
    def __init__(self, interval):
        self.delta = interval
        self.start_time = 0

    def start(self):
        self.start_time = time.monotonic()

    def elapsed(self):
        if (time.monotonic() - self.start_time) >= self.delta:
            self.reset()
            return True
        else:
            return False

    def reset(self):
        self.start_time = time.monotonic()
