{/* ========================MODAL==================== */}
<Modalize 
ref={modalizeRef}
onOpen={() => setModalOpen(true)}
onClose={() => setModalOpen(false)}
modalHeight={600}
snapPoint={600}
scrollViewProps={{ showsVerticalScrollIndicator: false, }}
>
<View style={{padding: 20}}>
<Text style={{fontSize: 22, fontWeight: 'bold', lineHeight: 34}}>
  {'This is a modal'}
</Text>
<View style={tw``}>

  <GestureDetector gesture={tapGesture}>
  <View style={tw`bg-blue-600 rounded-3xl py-3 mx-5 my-2`}>
    <Text style={tw`text-center text-white`}>Touch grass bro.</Text>
    <Animated.View
      style={[
        { position: 'absolute', bottom: -10, right: -10 }, // Position the checkmark outside the bubble
        checkmarkStyle, // Apply the animated style
      ]}
    >
      <Ionicons style={tw`text-blue-950`} name="checkmark-circle" size={24} />
    </Animated.View>
  </View>
  </GestureDetector>

  <View style={tw`bg-blue-600 rounded-3xl py-3 mx-5 my-2`}>
    <Text style={tw`text-center text-white`}>Initiate a tactile lawn inspection.</Text>
  </View>
  <View style={tw`bg-blue-600 rounded-3xl py-3 mx-5 my-2`}>
    <Text style={tw`text-center text-white`}>You're in last place, put the phone down.</Text>
  </View>
  <View style={tw`bg-blue-600 rounded-3xl py-3 mx-5 my-2`}>
    <Text style={tw`text-center text-white mx-1`}>Perhaps you might benefit from a tactile reunion with natures carpet.</Text>
  </View>
  <View style={tw`bg-blue-600 rounded-3xl py-3 mx-5 my-2`}>
    <Text style={tw`text-center text-white mx-1`}>Engage in an organic surface encounter.</Text>
  </View>
  <View style={tw`bg-blue-600 rounded-3xl py-3 mx-5 my-2`}>
    <Text style={tw`text-center text-white mx-2`}>Undertake a tactile audit of the earth's exterior layer.</Text>
  </View>
  <View style={tw`bg-blue-600 rounded-3xl py-3 mx-5 my-2`}>
    <Text style={tw`text-center text-white mx-2`}>Activate your primal ground sensors.</Text>
  </View>
  <View style={tw`bg-blue-600 rounded-3xl py-3 mx-5 my-2`}>
    <Text style={tw`text-center text-white mx-2`}>Eyes up, screens down.</Text>
  </View>
  <View style={tw`bg-blue-600 rounded-3xl py-3 mx-5 my-2`}>
    <Text style={tw`text-center text-white mx-2`}>If you ain't first, you're last. (You're last)</Text>
  </View>
</View>
</View>
</Modalize>