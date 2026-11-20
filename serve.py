"""Local preview server that never lets the browser reuse old copies of files.

Run from this folder:  python3 serve.py
Then open http://localhost:4321
"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, max-age=0")
        super().end_headers()


if __name__ == "__main__":
    ThreadingHTTPServer(("", 4321), NoCacheHandler).serve_forever()
