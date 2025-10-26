attribute float aT;

uniform float uAspect;
uniform float u_size;

varying vec4 v_color;
varying vec2 v_pos;
varying vec2 v_texCoord; // nowa

void main() {
    float x = 16.0 * pow(sin(aT), 3.0);
    float y = 13.0 * cos(aT) - 5.0 * cos(2.0*aT) - 2.0 * cos(3.0*aT) - cos(4.0*aT);

    vec2 pos = vec2(x, y) * (1.0/21.0) * u_size;
    pos.x *= uAspect;
    gl_Position = vec4(pos, 0.0, 1.0);

    v_color = vec4(1.0, 153.0/255.0, 204.0/255.0, 1.0/4.0);
    v_pos = vec2(x, y) * (1.0/21.0) * u_size;

    // mapujemy -1..1 NDC do 0..1 dla tekstury
    v_texCoord = vec2(0.5 + pos.x/2.0, 0.5 + pos.y/2.0);
}
