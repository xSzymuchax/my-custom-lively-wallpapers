precision highp float;

uniform float u_glowRadius;

varying vec4 v_color;
varying vec2 v_pos;


void main() {
    float dist = length(v_pos);
    float glow = exp(-dist*dist / (u_glowRadius * u_glowRadius)); 

    gl_FragColor = vec4(v_color.rgb, v_color.a * glow);
}
