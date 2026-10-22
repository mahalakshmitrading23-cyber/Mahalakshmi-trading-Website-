/* Hand-drawn pen marks laid over text. Purely decorative; the stroke draws itself in once on load. */

export function Underline() {
  return (
    <svg className="scribble scribble-under" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
      <path pathLength="1" d="M4 15 C 60 7, 120 5, 180 9 S 270 15, 296 6" />
      <path pathLength="1" d="M22 20 C 90 13, 170 12, 262 16" />
    </svg>
  );
}

export function Circle() {
  return (
    <svg className="scribble scribble-circle" viewBox="0 0 120 60" preserveAspectRatio="none" aria-hidden="true">
      <path pathLength="1" d="M70 6 C 30 2, 4 14, 6 32 C 8 50, 50 58, 86 52 C 116 46, 120 22, 98 10 C 84 3, 58 4, 42 9" />
    </svg>
  );
}
