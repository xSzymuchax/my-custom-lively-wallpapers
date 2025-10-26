attribute vec2 a_position;

uniform float u_offsetX;
uniform float u_offsetY;
uniform float u_sizeX;
uniform float u_sizeY;
uniform float uAspect;
uniform float u_rotation;

varying vec2 v_localPos;

void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    vec2 local = a_position;

    float c = cos(u_rotation);
    float s = sin(u_rotation);

    vec2 scaled = vec2(local.x * u_sizeX, local.y * u_sizeY);
    
    vec2 rotated = vec2(scaled.x * c - scaled.y * s,
                        scaled.x * s + scaled.y * c);

    vec2 pos = rotated + vec2(u_offsetX * (1.0/uAspect), u_offsetY);
    pos.x *= uAspect;

    gl_Position = vec4(pos, 0.0, 1.0);


    v_localPos = local;
}
