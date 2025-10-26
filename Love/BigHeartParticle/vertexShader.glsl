attribute float aT;

uniform float u_offsetX;
uniform float u_offsetY;
uniform float uAspect;
uniform float u_size;
uniform float u_rotation;
uniform float u_percentOfLife;

varying vec4 v_color;
varying vec2 v_pos;

void main() {
    // serce
    float x = 16.0 * pow(sin(aT), 3.0);
    float y = 13.0 * cos(aT) - 5.0 * cos(2.0*aT) - 2.0 * cos(3.0*aT) - cos(4.0*aT);
    
    // obrót
    float x2 = x * cos(u_rotation) - y * sin(u_rotation);
    float y2 = x * sin(u_rotation) + y * cos(u_rotation);
    x = x2;
    y = y2;

    // skalowanie
    vec2 pos = vec2(x,y) * (1.0 / 21.0) * u_size + vec2(u_offsetX * (1.0/uAspect), u_offsetY);
    pos.x *= uAspect;
   
    gl_Position = vec4(pos, 0.0, 1.0);

    // kolorek
    float r = 1.0;
    float g = 0.3 + 0.4*fract(u_offsetX*235345.0);
    float b = 0.7 + 0.4*fract(u_offsetY*2345325.0);
    float a = 1.0 - abs(2.0 * u_percentOfLife - 1.0);

    // przekazujemy do fragmenta
    v_color = vec4(r, g, b, a/2.0);
    v_pos = vec2(x, y) * (1.0 / 21.0) * u_size;
}
