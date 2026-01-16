export async function GET() {
  const response = await fetch("http://206.167.46.66:3000/camera/mjpeg");
  return new Response(response.body, {
    headers: {
      "Content-Type": "multipart/x-mixed-replace; boundary=frame",
    },
  });
}
