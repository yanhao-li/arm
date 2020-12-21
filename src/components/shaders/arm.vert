attribute vec4 a_Position;
attribute vec4 a_Color;
attribute vec4 a_Normal;
uniform mat4 u_NormalMatrix;
uniform mat4 u_MvpMatrix;
uniform mat4 u_ModelMatrix;
uniform vec3 u_AmbientLightColor;
uniform vec3 u_LightColor;
uniform vec3 u_LightDirection;
uniform vec3 u_LightPosition;
varying vec4 v_Color;

void main() {
    gl_Position = u_MvpMatrix * a_Position;
    vec3 normal = normalize((u_NormalMatrix * a_Normal).xyz);
    vec4 vertexPosition = u_ModelMatrix * a_Position;
    vec3 lightDirection = normalize(u_LightPosition - vec3(vertexPosition));
    float nDotL = max(dot(normal, lightDirection), 0.0);

    vec3 diffuse = u_LightColor * a_Color.rbg * nDotL;
    vec3 ambient = u_AmbientLightColor * a_Color.rgb;

    v_Color = vec4(diffuse + ambient, a_Color.a);
}
