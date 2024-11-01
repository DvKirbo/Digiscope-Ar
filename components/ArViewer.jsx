import {
    Viro3DObject,
    ViroAmbientLight,
    ViroAnimations,
    ViroARImageMarker,
    ViroARScene,
    ViroARSceneNavigator,
    ViroARTrackingTargets,
    ViroMaterials,
    ViroNode,
    ViroText,
    ViroTrackingStateConstants,
  } from "@reactvision/react-viro";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import ArCards from "./ArCards";

  export default function ArViewer(){
    
    const [text, setText] = useState("Initializing AR...");
    const targets = ["microscope", "test_tube"];
    const [animate, setAnimate] = useState(false);


 /*  ViroMaterials.createMaterials({
    virus:{
      diffuseTexture:require('../res/T_Virus/Cap_Normal.tif')
    }
  }) */

    const data = [{target: 'microscope',
                    scale: [.6, .6, .6], 
                    model: require('../res/microscope/mikro1.obj'),
                    type: "OBJ",
                    resources:[
                      require('../res/microscope/1216181.jpg'),
                      require('../res/microscope/5555.png'),
                      require('../res/microscope/micro_BaseColor.png'),
                      require('../res/microscope/micro_Normal.png'),
                      require('../res/microscope/podstavka_BaseColor.png'),]
                  },
                  {target: 'test_tube',
                    scale: [.05, .05, .05], 
                    model: require('../res/test-tube-mutations/source/Phials_Collection.vrx'),
                    type: "VRX",
                    resources:[
                      require('../res/test-tube-mutations/source/internal_ground_ao_texture.jpeg'),
                      require('../res/test-tube-mutations/source/Phial__Emissive.png'),
                      require('../res/test-tube-mutations/source/Phial_BaseColor.png'),
                      require('../res/test-tube-mutations/source/Phial_Blank_BaseColor.png'),
                      require('../res/test-tube-mutations/source/Phial_Light_Opacity.png'),
                      require('../res/test-tube-mutations/source/Phial_Metallic.png'),
                      require('../res/test-tube-mutations/source/Phial_Normal.png'),
                      require('../res/test-tube-mutations/source/Phial_Roughness.png'),
                      require('../res/test-tube-mutations/source/Rack_LP_Rack_BaseColor.1001.png'),
                      require('../res/test-tube-mutations/source/Rack_Normal_OpenGl.png'),
                      require('../res/test-tube-mutations/source/Rack_Metalic.png'),
                      require('../res/test-tube-mutations/source/Rack_Rough.png')
                    ]
                  },{target: 'thermometer',
                    scale: [.1, .1, .1], 
                    model: require('../res/thermometer/source/Thermometer.vrx'),
                    type: "VRX",
                    resources:[
                    ]
                  },{target: 'petri',
                    scale: [2, 2, 2], 
                    model: require('../res/petri/petri.obj'),
                    type: "OBJ",
                    resources:[]
                  }
                ]

  ViroARTrackingTargets.createTargets({
    'microscope':{
      source : require('../res/Cards/microscope.jpg'),
      orientation : "Up",//default is Up, can be Up, Down, Left, Right, Back, Front 
      physicalWidth : 0.1//real world width in meters
    },
    'test_tube':{
        source : require('../res/Cards/test_tube.jpg'),
        orientation : "Up",//default is Up, can be Up, Down, Left, Right, Back, Front 
        physicalWidth : 10//real world width in meters
    },
    'petri':{
      source : require('../res/Cards/petri.jpg'),
      orientation : "Up",//default is Up, can be Up, Down, Left, Right, Back, Front 
      physicalWidth : 0.9//real world
    },
    'thermometer':{
      source : require('../res/Cards/thermometer.jpg'),
      orientation : "Up",//default is Up, can be Up, Down, Left, Right, Back, Front 
      physicalWidth : 1//real world
    },
    'balance':{
      source : require('../res/Cards/balance.jpg'),
      orientation : "Up",//default is Up, can be Up, Down, Left, Right, Back, Front 
      physicalWidth : 0.1//real world
    }
  })

ViroAnimations.registerAnimations({
    grow:{
      properties:{
        scaleX:.1,
        scaleY:.1,
        scaleZ:.1
      },
      duration:500, //.25 seconds
      easing:"EaseInEaseOut"
    },
    rotate:{
      properties:{
        rotateY:"+=20"
      },
      duration:500, //.25 seconds
    }
  })
  
  const onAnchorFound = () => {
    console.log("Image found");
    setAnimate(true);
  }

    const CardsScene =(props) =>{
        return(
            <ViroARScene onTrackingUpdated={onInitialized}>
                {/* <ViroText text={text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} /> */}
                
                <ViroAmbientLight color={"#aaaaaa"} influenceBitMask={1} />
                
                {data.map((item, index)=>{
                  return(
                    <ArCards 
                      key={index} 
                      target={item.target} 
                      scale={item.scale} 
                      model={item.model} 
                      onAnchorFound={onAnchorFound} 
                      resources={item.resources} 
                      type={item.type} 
                      />
                  )
                })}
            </ViroARScene>
        )
    }

    function onInitialized(state, reason) {
      if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
        setText("Hola wasa!");
      } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
        // Handle loss of tracking
      }
    }

    return (
        <>
            <ViroARSceneNavigator
                autofocus={true}
                initialScene={{
                  scene: CardsScene,
                }}

                style={{ flex: 1 }}
            />
            <View style={styles.footer}>
            </View>
        </>
    )
  }

  const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 40,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
    backgroundColor: "black",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    backgroundColor: "#63afff",
    padding: 10,
    alignItems: "center",
  },
  })