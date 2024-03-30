const modalizeRef = useRef(null);
const [modalOpen, setModalOpen] = useState(false);


useEffect(() => {
  if (modalizeRef.current) {
    console.log("==========Mounted===============");
  }
}, [modalizeRef.current]);

<> onPress={() => {
    console.log(modalizeRef);
    if (modalOpen) {
      modalizeRef.current?.close();
    } else {
      modalizeRef.current?.open();
    }
  }}
</>

{/* ======================MODAL==================== */}
<Modalize 
ref={modalizeRef}
onOpen={() => setModalOpen(true)}
onClose={() => setModalOpen(false)}
modalHeight={600}
snapPoint={600}
scrollViewProps={{ showsVerticalScrollIndicator: false, }}
modalStyle={tw`bg-black`}
HeaderComponent={
  <View style={tw`pt-4 pb-4 relative  `}>
    <Text style={tw`font-bold text-center text-xl text-white/90`}>
      {'Choose a Message'}
    </Text>
    <TouchableOpacity style={tw`absolute bottom-3 right-13`}>
      <Animated.View entering={FadeInLeft.delay(500).duration(500).springify()} 
        style={tw`border-sky-800 border p-1 px-3 rounded-lg`}>
        <Ionicons name="send-sharp" size={22} color="white" />
      </Animated.View>
    </TouchableOpacity>
  </View>
}
>

<View style={tw` `}>
<View style={tw`mb-13`}>
  <MessagesContainer/>
</View>
</View>
</Modalize>


const [scrollOffset, setScrollOffset] = useState(0);
const scrollViewRef = useRef(null);

const handleOnScroll = event => {
  setScrollOffset(event.nativeEvent.contentOffset.y);
};

const handleScrollTo = (p) => {
  if (scrollViewRef.current) {
    scrollViewRef.current.scrollTo({
      y: p.y,
      animated: true,
    });
  }
};

<Modal 
animationIn='slideInUp' 
animationInTiming={300}
animationOut='slideOutDown'
animationOutTiming={300}
backdropTransitionInTiming={600}
backdropTransitionOutTiming={600}
isVisible={modalOpen}
onBackButtonPress={() => setModalOpen(false)}
onBackdropPress={() => setModalOpen(false)}
onSwipeComplete={() => setModalOpen(false)}
swipeThreshold={1}
swipeDirection={['down']}
useNativeDriverForBackdrop={true}
propagateSwipe={true}
scrollTo={handleScrollTo}
scrollOffset={scrollOffset}
//scrollOffsetMax={400}
style={tw`justify-end m-0 w-full`}
>
<View style={tw`flex-col justify-center items-center  pt-2 rounded-t-2xl`}>
  <View style={tw`bg-white rounded-full h-1 w-10 mb-2 `} />
</View>
<View style={tw` h-2/3 w-full`}>
  <View style={tw`pt-4 pb-4 relative bg-black rounded-t-2xl `}>
    <Text style={tw`font-bold text-center text-xl text-white/90`}>
      {'Choose a Message'}
    </Text>
    <TouchableOpacity style={tw`absolute bottom-3 right-13`}>
      <Animated.View entering={FadeInLeft.delay(500).duration(500).springify()} 
        style={tw`border-sky-800 border p-1 px-3 rounded-lg`}>
        <Ionicons name="send-sharp" size={22} color="white" />
      </Animated.View>
    </TouchableOpacity>
  </View>

  <View style={tw`flex-1 bg-black `}>
  
    <ScrollView 
      ref={scrollViewRef}
      showsVerticalScrollIndicator={true}
      onScroll={handleOnScroll}
      scrollEventThrottle={8}
    >
      <MessagesContainer/>
    </ScrollView>
  
  </View>
  
</View>
</Modal>