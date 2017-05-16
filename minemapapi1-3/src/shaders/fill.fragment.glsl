#pragma minemap: define highp vec4 color
#pragma minemap: define lowp float opacity

void main() {
    #pragma minemap: initialize highp vec4 color
    #pragma minemap: initialize lowp float opacity

    gl_FragColor = color * opacity;

#ifdef OVERDRAW_INSPECTOR
    gl_FragColor = vec4(1.0);
#endif
}
