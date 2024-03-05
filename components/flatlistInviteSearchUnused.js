{/* ================INVITE SEARCH RESULTS===================== */}
{
    contactsData.length > 0 && tab == 'Invite' && showSearch ? (
      <View style={tw`absolute w-full bg-gray-100 top-16 rounded-3xl`}>
        <FlatList
          data={contactsData}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (<View style={tw`h-0.5 bg-gray-400`}></View>)}
          renderItem={({ item: contact }) => {
            let mobileNumber = 'N/A';
            if (Array.isArray(contact.phoneNumbers)) {
              const mobilePhoneNumberObject = contact.phoneNumbers.find(phone => phone.label === "mobile");
              mobileNumber = mobilePhoneNumberObject ? mobilePhoneNumberObject.number : 'N/A';
            }
  
            return (
              <View style={tw.style(['flex-row', 'items-center', 'p-3', 'border-0', 'px-4', 'mb-1', 'justify-between'])}>
                <View style={tw`flex-row items-center`}>
                  {contact.imageAvailable ? (
                    <Image source={{ uri: contact.pic }} style={tw`h-10 w-10 rounded-full mr-2`} />
                  ) : (
                    <View style={tw`w-10 h-10 bg-slate-600 mr-2 rounded-full justify-center items-center`}>
                      <Text style={[tw`text-white font-bold text-lg text-center `]}>{contact.name[0]}</Text>
                    </View>
                  )}
                  <Text style={tw`text-black text-lg`}>{contact.name}</Text>
                </View>
                {/* =============INVITE SMS BUTTON================ */}
                <TouchableOpacity
                  style={tw.style('p-3', 'px-5', 'rounded-3xl', 'self-end', 'bg-blue-600', 'flex-row', 'items-center', { 'bg-slate-600': addedInvites[contact.id] })}
                  onPress={() => {
                    setAddedInvites(prev => ({ ...prev, [contact.id]: !prev[contact.id] }));
                    handleInviteFriendSMS(mobileNumber);
                  }}
                >
                  <Text style={tw.style('text-white', 'mr-2')}>{addedInvites[contact.id] ? 'Send again' : 'Send link'}</Text>
                  <Feather name="send" size={14} color="white" />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    ) : null
  }