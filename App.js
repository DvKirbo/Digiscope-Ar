import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARScene,
  ViroARSceneNavigator,
  ViroBox,
  ViroImage,
  ViroNode,
  ViroQuad,
  ViroSpotLight,
  ViroText,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

const HelloWorldSceneAR = () => {
  const [text, setText] = useState("Initializing AR...");

  function onInitialized(state, reason) {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Hola kelly!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {/* <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      /> */}



<ViroImage 
  source={require('./assets/draco.png')}
  position={[0, 0, -1]}
  scale={[.5, .5, .5]}
/>


<ViroNode position={[-.5, -.5, -.5]} dragType="FixedToWorld" onDrag={()=>{}} >

{/* Spotlight to cast light on the object and a shadow on the surface, see
    the Viro documentation for more info on lights & shadows */}
<ViroSpotLight
  innerAngle={5}
  outerAngle={45}
  direction={[0,-1,-.2]}
  position={[0, 3, 0]}
  color="#ffffff"
  castsShadow={true}
  influenceBitMask={2}
  shadowMapSize={2048}
  shadowNearZ={2}
  shadowFarZ={5}
  shadowOpacity={.7} />


<Viro3DObject
              source={require('./res/emoji_smile/emoji_smile.vrx')}
              position={[0, .2, 0]}
              scale={[.2, .2, .2]}
              type="VRX"
            lightReceivingBitMask={3}
            shadowCastingBitMask={2}
            transformBehaviors={['billboardY']}
            resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                       require('./res/emoji_smile/emoji_smile_specular.png'),
                       require('./res/emoji_smile/emoji_smile_normal.png')]}/>

<ViroQuad
  rotation={[-90,0,0]}
  width={.5} height={.5}
  arShadowReceiver={true}
  lightReceivingBitMask={2} />

</ViroNode>

{/* Node that contains a light, an object and a surface to catch its shadow
notice that the dragType is "FixedToWorld" so the object can be dragged
along real world surfaces and points. */}
<ViroNode position={[.5,-.5,-.5]} dragType="FixedDistanceOrigin" onDrag={()=>{}} >

{/* Spotlight to cast light on the object and a shadow on the surface, see
    the Viro documentation for more info on lights & shadows */}
{/* <ViroSpotLight
  innerAngle={5}
  outerAngle={45}
  direction={[0,-1,-.2]}
  position={[0, 3, 0]}
  color="#ffffff"
  castsShadow={true}
  influenceBitMask={4}
  shadowMapSize={2048}
  shadowNearZ={2}
  shadowFarZ={5}
  shadowOpacity={.7} />
 */}
{/* <ViroQuad
  rotation={[-90,0,0]}
  width={.5} height={.5}
  arShadowReceiver={true}
  lightReceivingBitMask={4} /> */}

</ViroNode>


    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
