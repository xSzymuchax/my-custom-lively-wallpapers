precision highp float;

varying vec2 v_localPos;

uniform float u_glowRadius;

#define lightpink vec3(0.8196, 0.4784, 0.7725)

void main() {
    float dist = length(v_localPos);
    float glow = exp(-dist*dist / (u_glowRadius*u_glowRadius));
    glow = pow(glow, 0.7);
    gl_FragColor = vec4(lightpink, glow/2.0);
}
