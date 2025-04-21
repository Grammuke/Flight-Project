import { View, Text } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import LayoutWithSafeArea from "@/components/layout/LayoutWithSafeArea";
import Box from "@/components/layout/Box";
import globalStyle from "@/globalStyle/globalStyle";
import HeaderComponent from "@/components/header/HeaderComponent";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from "react-native-reanimated";
import TitleText from "@/components/utils/TitleText";
import { emailPattern } from "@/constants/utils/constants";
import TextInputComponent from "@/components/textInputs/TextInputComponent";
import PasswordInputComponent from "@/components/textInputs/PasswordInputComponent";
import TextComponent from "@/components/text/TextComponent";
import { useTickLists } from "@/constants/utils/ComponentConstants";
import ButtonComponent from "@/components/button/ButtonComponent";
import { registerValues } from "@/constants/utils/util";
import useAuth from "@/service/auth";
import { useStore } from "@/store/store";
const totalSteps = 2;

const Getstarted = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { useCreateAccount } = useAuth();
  const { showToast } = useStore((state) => state);
  const { createAccountMutation, isLoadingCreateAccount, isSuccess } =
    useCreateAccount();
  const [oldStep, setOldStep] = useState(1);
  const onBackPress = () => {
    if (currentStep === 1) {
      router.back();
    } else {
      let newVal = currentStep - 1;
      setCurrentStep(newVal);
      setTimeout(() => {
        setOldStep(newVal);
      }, 500);
    }
  };
  const createAccount = (data: registerValues) => {
    console.log("-------creating -------");

    createAccountMutation(
      { ...data, email: data.email.trim().toLowerCase() },
      {
        onSuccess: () => {
          showToast({
            message: "Account created successfully, please login",
            status: 1,
          });
          router.replace("/loginscreen");
        },
      }
    );
  };
  const onNext = (data: registerValues) => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => (prev += 1));
    } else {
      createAccount(data);
      // router.replace('/home');
    }
  };
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<registerValues>({
    // mode: 'onBlur',
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const watchPassword = watch("password");

  const { tickLists, isDisabled } = useTickLists(watchPassword);

  return (
    <LayoutWithSafeArea>
      <Box style={[globalStyle.px2, globalStyle.pt1p2, globalStyle.flexOne]}>
        <HeaderComponent onBackPress={onBackPress} />
        <Box style={[globalStyle.flexOne, globalStyle.pt2p4]}>
          <Animated.View
            key={`${currentStep}-title`}
            entering={FadeIn}
            exiting={FadeOut}
            style={[globalStyle.pt2p4]}
          >
            <TitleText
              title={
                currentStep === 1
                  ? "Your Personal Details"
                  : currentStep === 2
                  ? "Secure your account"
                  : ""
              }
              desc={
                currentStep === 1
                  ? "Enter your personal details to get started."
                  : currentStep === 2
                  ? "Create a new password for your Flightly account."
                  : ""
              }
            />
          </Animated.View>
          <Animated.View
            key={`${currentStep}`}
            entering={oldStep > currentStep ? SlideInLeft : SlideInRight}
            exiting={oldStep > currentStep ? SlideOutRight : SlideOutLeft}
            style={[globalStyle.flexOne]}
          >
            {currentStep === 1 && (
              <Box>
                <Box style={[globalStyle.pt2p4]}>
                  <Controller
                    control={control}
                    name="firstName"
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInputComponent
                        value={value}
                        onChangeText={onChange}
                        placeholder={"Enter First name"}
                        onBlur={onBlur}
                        title={"First name"}
                        errorText={errors?.firstName?.message}
                      />
                    )}
                    rules={{
                      required: {
                        value: currentStep === 1,
                        message: "First name is required",
                      },
                    }}
                  />
                </Box>
                <Box style={[globalStyle.pt2p4]}>
                  <Controller
                    control={control}
                    name="lastName"
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInputComponent
                        value={value}
                        onChangeText={onChange}
                        placeholder={"Enter Last name"}
                        onBlur={onBlur}
                        title={"Last name"}
                        errorText={errors?.lastName?.message}
                      />
                    )}
                    rules={{
                      required: {
                        value: currentStep === 1,

                        message: "Last name is required",
                      },
                    }}
                  />
                </Box>
                <Box style={[globalStyle.pt2p4]}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: {
                        message: "Email address is required",
                        value: true,
                      },
                      pattern: {
                        value: emailPattern,
                        message: "Enter a valid email address",
                      },
                    }}
                    render={({ field: { onChange, value } }) => (
                      <TextInputComponent
                        value={value}
                        // loading={isLoadingGetOrganuzations}
                        // loading={true}
                        errorText={errors.email?.message}
                        onChangeText={onChange}
                        title="Email address"
                        placeholder="Enter Email address"
                        whiteBg={false}
                        isEllipse
                      />
                    )}
                  />
                </Box>
              </Box>
            )}

            {currentStep === 2 && (
              <Box
                style={[
                  globalStyle.flexOne,
                  globalStyle.pt2,
                  globalStyle.pb4,
                  globalStyle.justifyBetween,
                ]}
              >
                <Box>
                  <Box style={[]}>
                    <Controller
                      control={control}
                      name="password"
                      rules={{
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <PasswordInputComponent
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          errorText={errors.password?.message}
                          placeholder="Password"
                          title="Password"
                        />
                      )}
                    />
                  </Box>
                  <Box style={[globalStyle.pt2p4]}>
                    {tickLists.map(({ icon, text }, index) => (
                      <Box
                        style={[globalStyle.flexrow, globalStyle.py0p8]}
                        key={index.toString()}
                      >
                        {icon}
                        <Box style={[globalStyle.pl1]}>
                          <TextComponent>{text}</TextComponent>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            )}
          </Animated.View>

          <Box style={[globalStyle.pt4, globalStyle.pb2p4]}>
            <ButtonComponent
              title="Continue"
              loading={isLoadingCreateAccount}
              onPress={handleSubmit(onNext)}
              // onPress={onNext}
              // loading={

              // }
              disabled={currentStep === 2 && isDisabled()}
            />
          </Box>
        </Box>
      </Box>
    </LayoutWithSafeArea>
  );
};

export default Getstarted;
