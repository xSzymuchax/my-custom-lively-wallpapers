precision highp float;

uniform float u_glowRadius;

varying vec4 v_color;
varying vec2 v_pos;


void main() {
    gl_FragColor = vec4(v_color.rgb, v_color.a);
}
