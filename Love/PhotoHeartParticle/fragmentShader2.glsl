precision highp float;

uniform float u_glowRadius;
uniform sampler2D u_texture;
uniform float u_percentOfLife;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

void main() {
    // glow
    float dist = length(v_pos);
    float glow = exp(-dist*dist / (u_glowRadius * u_glowRadius)); 

    // kolor z tekstury
    vec4 texColor = texture2D(u_texture, v_uv);

    // finalny kolor = tekstura * alpha glow
    float alphaLife = 1.0 - abs(2.0 * u_percentOfLife - 1.0); 
    gl_FragColor = vec4(v_color.rgb, alphaLife * glow);
}
