import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePassword, checkEmail, checkUsername, updateProfile } from "../apiFetches/fetches";
import debounce from "../debounce/debounce";

export default function Edit_Screen({ navigation, route }) {
  const { fieldType, value } = route.params;
  const [userInput, setUserInput] = useState(value);

  const [email, setEmail] = useState(value);
  const [confirmEmail, setConfirmEmail] = useState(value);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [passwordVisible3, setPasswordVisible3] = useState(false);

  const queryClient = useQueryClient();

  const updateFn = useMutation({
    mutationFn: (changes) => updateProfile(changes),
    onSuccess: () => {
      navigation.goBack();
      queryClient.invalidateQueries({ queryKey: ["self"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
    onError: (error) => {
      console.error(error.detail);
    },
  });

  const changePsFn = useMutation({
    mutationFn: (passwords) => changePassword(passwords),
    onSuccess: () => {
      navigation.push("Login3");
    },
    onError: (error) => {
      console.error(JSON.stringify(error.detail, null, 2));
    },
  });


  const handleCheckUsername = async input => {
    if (input == '') {
      setUsernameTaken(false);
      return
    }
    try {
      const response = await checkUsername(input);
      setUsernameTaken(false);
    } catch (error) {
      setUsernameTaken(true);
    }
  }
  const debounceCheckUsername = debounce(handleCheckUsername, 500)

  const handleCheckEmail = async input => {
    if (input == '') {
      setEmailTaken(false);
      return
    }
    try {
      const response = await checkEmail(input);
      setEmailTaken(false);
    } catch (error) {
      setEmailTaken(true);
    }
  }
  const debounceCheckEmail = debounce(handleCheckEmail, 500)
  
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);

  return (
    <View style={tw`flex-1 bg-black`}>
      <StatusBar style="light" />
      <SafeAreaView style={tw`flex-1`}>
        {/*=============== Top bar with x and check================ */}
        {fieldType == "Email" ? (
          <View style={tw`flex-row items-center ml-3 mt-4 `}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close-outline" size={34} color="white" />
            </TouchableOpacity>
            <Text style={tw`text-white text-2xl font-bold ml-6`}>Email</Text>
            {
              email != confirmEmail | emailTaken ? (
                null
              ) : (
                <TouchableOpacity
                  style={tw`absolute right-5`}
                  onPress={() => {
                    lower = email.toLowerCase();
                    updateFn.mutate({ email: lower });
                  }}
                >
                  <Ionicons name="checkmark" size={34} style={tw`text-blue-600 `} />
                </TouchableOpacity>
              )
            }

          </View>
        ) : fieldType == "Password" ? (
          <View style={tw`flex-row items-center ml-3 mt-4 `}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close-outline" size={34} color="white" />
            </TouchableOpacity>
            <Text style={tw`text-white text-2xl font-bold ml-6`}>Password</Text>
            {
              newPassword != confirmPassword | newPassword.length < 8 | oldPassword.length < 8 ? (
                null
              ) : (
                <TouchableOpacity
                  style={tw`absolute right-5`}
                  onPress={() => {
                    if (newPassword != confirmPassword) {
                      alert("New passwords do not match.");
                    } else if (newPassword.length < 8) {
                      alert("Must be at least 8 characters long.");
                    } else {
                      changePsFn.mutate({
                        old_password: oldPassword,
                        new_password: newPassword,
                        confirm_password: confirmPassword,
                      });
                    }
                  }}
                >
                  <Ionicons name="checkmark" size={34} style={tw`text-blue-600 `} />
                </TouchableOpacity>
              )
            }
          </View>
        ) : fieldType == 'full_name' ? (
          <View style={tw`flex-row items-center ml-3 mt-4 `}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close-outline" size={34} color="white" />
            </TouchableOpacity>
            <Text style={tw`text-white text-2xl font-bold ml-6`}>
              Name
            </Text>
            <TouchableOpacity
              style={tw`absolute right-5`}
              onPress={() =>
                updateFn.mutate({ full_name: userInput })
              }
            >
              <Ionicons name="checkmark" size={34} style={tw`text-blue-600 `} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={tw`flex-row items-center ml-3 mt-4 `}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close-outline" size={34} color="white" />
            </TouchableOpacity>
            <Text style={tw`text-white text-2xl font-bold ml-6`}>
              Username
            </Text>
            {
              usernameTaken ? (
                null
              ) : (
                <TouchableOpacity
                  style={tw`absolute right-5`}
                  onPress={() =>
                    updateFn.mutate({ username: userInput })
                  }
                >
                  <Ionicons name="checkmark" size={34} style={tw`text-blue-600 `} />
                </TouchableOpacity>
              )
            }

          </View>
        )}

        {/* ==================Input====================== */}
        {fieldType == "Email" ? (
          <View style={tw`flex-col mx-5 mt-10`}>
            <View style={tw`flex-col pb-1 border-b-2  mb-4 ${emailTaken ? 'border-red-700/50':'border-white/50'}`}>
              <Text style={tw`text-white/50`}>Email</Text>
              <TextInput
                style={tw`text-white text-lg`}
                inputMode="email"
                autoComplete="email"
                onChangeText={(text) => {
                  debounceCheckEmail(text);
                  setEmail(text);
                }}
              >
                {value}
              </TextInput>
            </View>

            <View
              style={tw`flex-col pb-1 border-b-2 mb-4 ${
                email == confirmEmail ? "border-white/50" : "border-red-600/50"
              }`}
            >
              <Text style={tw`text-white/50`}>Confirm email</Text>
              <TextInput
                style={tw`text-white text-lg`}
                inputMode="email"
                autoComplete="email"
                onChangeText={(text) => {
                  setConfirmEmail(text);
                }}
              >
                {value}
              </TextInput>
            </View>

            {/* Help text */}
            <View style={tw``}>
              <Text style={tw` ${emailTaken ? 'text-red-700/50':'text-white/50'}`}>
                {emailTaken ? 'That email is already taken.':'For if you forget your password.'}
              </Text>
            </View>
          </View>
        ) : fieldType == "Password" ? (
          <View style={tw`flex-col mx-5 mt-10`}>
            <View style={tw`flex-col pb-1 border-b-2 border-white/50 mb-4`}>
              <Text style={tw`text-white/50`}>Current Password</Text>
              <View>
                <TextInput
                  style={tw`text-white text-lg`}
                  secureTextEntry={!passwordVisible1}
                  autoComplete="current-password"
                  placeholder=""
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  onChangeText={(text) => {
                    setOldPassword(text);
                  }}
                ></TextInput>
                <TouchableOpacity
                  style={tw` absolute right-4`}
                  onPressIn={() => setPasswordVisible1(true)}
                  onPressOut={() => setPasswordVisible1(false)}
                >
                  <Ionicons
                    name="eye-off-outline"
                    size={26}
                    style={tw`text-white/40`}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={tw`flex-col pb-1 border-b-2 border-white/50 mb-4 }`}>
              <Text style={tw`text-white/50`}>New password</Text>
              <View>
                <TextInput
                  style={tw`text-white text-lg  `}
                  secureTextEntry={!passwordVisible2}
                  autoComplete="new-password"
                  placeholder=""
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  onChangeText={(text) => {
                    setNewPassword(text);
                  }}
                ></TextInput>
                <TouchableOpacity
                  style={tw` absolute right-4`}
                  onPressIn={() => setPasswordVisible2(true)}
                  onPressOut={() => setPasswordVisible2(false)}
                >
                  <Ionicons
                    name="eye-off-outline"
                    size={26}
                    style={tw`text-white/40`}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={tw`flex-col pb-1 border-b-2 border-white/50 mb-4 ${
                (newPassword == confirmPassword) & (newPassword.length >= 8)
                  ? "border-white/50"
                  : "border-red-600/50"
              }`}
            >
              <Text style={tw`text-white/50`}>Confirm new password</Text>
              <View>
                <TextInput
                  style={tw`text-white text-lg`}
                  secureTextEntry={!passwordVisible3}
                  autoComplete="new-password"
                  placeholder=""
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                  }}
                ></TextInput>
                <TouchableOpacity
                  style={tw` absolute right-4`}
                  onPressIn={() => setPasswordVisible3(true)}
                  onPressOut={() => setPasswordVisible3(false)}
                >
                  <Ionicons
                    name="eye-off-outline"
                    size={26}
                    style={tw`text-white/40`}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Help text */}
            <View style={tw``}>
              <Text style={tw`text-white/50 `}>
                Must be at least 8 characters long.
              </Text>
            </View>
          </View>
        ) : fieldType == "full_name"? (
        <View style={tw`flex-col mx-5 mt-10`}>
          <View style={tw`flex-col pb-1 border-b-2 border-white/50 mb-4`}>
            <Text style={tw`text-white/50`}>
              Name
            </Text>
            <TextInput
              style={tw`text-white text-lg`}
              onChangeText={(text) => {
                setUserInput(text);
              }}
            >
              {value}
            </TextInput>
          </View>
          {/* Help text */}
          <View style={tw``}>
            <Text style={tw`text-white/50 `}>
              Help people discover your account by using the name you're
              known by: like your full name or nickname.
            </Text>
          </View>
        </View>
        ) : (
          <View style={tw`flex-col mx-5 mt-10`}>
            <View style={tw`flex-col pb-1 border-b-2  mb-4 ${usernameTaken ? 'border-red-700/50':'border-white/50'}`}>
              <Text style={tw`text-white/50`}>
                Username
              </Text>
              <TextInput
                style={tw`text-white text-lg`}
                onChangeText={(text) => {
                  debounceCheckUsername(text);
                  setUserInput(text);
                }}
              >
                {value}
              </TextInput>
            </View>
            {/* Help text */}
            <View style={tw``}>
              <Text style={tw` ${usernameTaken ? 'text-red-700/50':'text-white/50'} `}>
                {usernameTaken ? "That username is already taken.":"Update your username to something cool."}
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
