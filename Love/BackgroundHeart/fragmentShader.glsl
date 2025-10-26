precision highp float;

uniform float u_glowRadius;
uniform sampler2D u_textTexture; // tekstura z napisem

varying vec4 v_color;
varying vec2 v_pos;
varying vec2 v_texCoord; // musisz dodać w vertex shader

void main() {
    float dist = length(v_pos);
    float glow = exp(-dist*dist / (u_glowRadius * u_glowRadius)); 

    vec4 heartColor = vec4(v_color.rgb, v_color.a * glow);
    vec4 textColor = texture2D(u_textTexture, v_texCoord);

    // Nakładamy napis na serce
    gl_FragColor = mix(heartColor, textColor, textColor.a);
}
