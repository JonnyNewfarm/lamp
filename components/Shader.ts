export const vertex = `
  uniform vec2 uVelocity;
  uniform float uStrength;

  varying vec2 vUv;

  void main() {
    vUv = uv;

    vec3 transformed = position;

    float horizontalMask =
      sin(uv.y * 3.14159265);

    float verticalMask =
      sin(uv.x * 3.14159265);

    transformed.x +=
      uVelocity.x *
      0.0018 *
      horizontalMask *
      uStrength;

    transformed.y +=
      uVelocity.y *
      0.0018 *
      verticalMask *
      uStrength;

    gl_Position =
      projectionMatrix *
      modelViewMatrix *
      vec4(transformed, 1.0);
  }
`;

export const fragment = `
  uniform sampler2D uTexture;
  uniform vec2 uVelocity;
  uniform float uStrength;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    float horizontalMask =
      sin(uv.y * 3.14159265);

    float verticalMask =
      sin(uv.x * 3.14159265);

    uv.x -=
      uVelocity.x *
      0.0016 *
      horizontalMask *
      uStrength;

    uv.y -=
      uVelocity.y *
      0.0016 *
      verticalMask *
      uStrength;

    uv = clamp(
      uv,
      vec2(0.002),
      vec2(0.998)
    );

    gl_FragColor = texture2D(
      uTexture,
      uv
    );
  }
`;