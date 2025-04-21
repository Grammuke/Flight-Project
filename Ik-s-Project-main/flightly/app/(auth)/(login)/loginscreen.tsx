import { View, Text } from "react-native";
import React from "react";
import LayoutWithSafeArea from "@/components/layout/LayoutWithSafeArea";
import TextComponent from "@/components/text/TextComponent";
import Box from "@/components/layout/Box";
import AppIcon from "@/assets/svgs/AppIcon3.svg";
import globalStyle from "@/globalStyle/globalStyle";
import ButtonComponent from "@/components/button/ButtonComponent";
import PressableComponent from "@/components/pressable/PressableComponent";
import { emailPattern } from "@/constants/utils/constants";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInputComponent from "@/components/textInputs/TextInputComponent";
import PasswordInputComponent from "@/components/textInputs/PasswordInputComponent";
import useAuth from "@/service/auth";
import { router } from "expo-router";
import { useAuthStore } from "@/store/authStore";
type FormValues = {
  email: string;
  password: string;
};
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .test("test-email", "Please enter a valid email", function (value) {
      // const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
      if (value) {
        return emailPattern.test(value);
      }
    })
    .required("Field is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Loginscreen = () => {
  const saveUserLogin = useAuthStore((state) => state.saveUserLogin);

  const { useLoginMutation } = useAuth();
  const { isLoading, logUserInMutation } = useLoginMutation();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      password: "",
      email: "",
      // username: '', TODO uncomment later
    },
    resolver: yupResolver(validationSchema),
  });
  const logUserIn = ({ email, password }: FormValues) => {
    logUserInMutation(
      {
        email: email.trim().toLowerCase(),
        password,
      },
      {
        onSuccess: (loginResponse) => {
          const res = loginResponse?.data?.data;
          console.log({
            loginResponse: res,
          });
          saveUserLogin({
            email: res.email ?? "",
            name: res.firstName ?? "",
          });
          router.replace("/home");
        },
      }
    );
  };
  return (
    <LayoutWithSafeArea>
      <Box
        style={[
          globalStyle.justifyCenter,
          globalStyle.alignItemsCenter,
          globalStyle.pt3p6,
          globalStyle.px2,
        ]}
      >
        <AppIcon width={80} height={80} />
        <Box
          style={[
            globalStyle.pb0p8,
            globalStyle.pt1p6,
            globalStyle.flexrow,
            globalStyle.alignItemsCenter,
            globalStyle.px4,
          ]}
        >
          <TextComponent
            style={[
              globalStyle.fontGroteskMedium25,
              globalStyle.fontSize18,
              globalStyle.lineHeight24,
              globalStyle.textCenter,
            ]}
          >
            Welcome to Flightly
          </TextComponent>
        </Box>
        <Box style={[globalStyle.w10, globalStyle.pt2p4, globalStyle.pb3]}>
          <Box style={[globalStyle.justifyCenter]}>
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
                  placeholder="Email address"
                  whiteBg={false}
                  isEllipse
                />
              )}
            />

            <Box style={[globalStyle.pt2]}>
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <PasswordInputComponent
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    errorText={errors.password?.message}
                    placeholder="Password"
                    whiteBg={false}
                  />
                )}
              />
            </Box>
            <Box>
              <Box
                style={[
                  globalStyle.pt1p6,
                  globalStyle.w10,
                  globalStyle.flexrow,
                  globalStyle.justifyCenter,
                  globalStyle.alignItemsCenter,
                  globalStyle.gap4,
                ]}
              >
                <Box
                  style={[globalStyle.flexrow, globalStyle.alignItemsCenter]}
                >
                  <TextComponent style={[]}>
                    Don't have an account?
                  </TextComponent>
                </Box>
                <Box>
                  <PressableComponent
                    onPress={() => {
                      router.navigate("/getstarted");
                    }}
                  >
                    <TextComponent style={[globalStyle.textSecondary]}>
                      Create Account
                    </TextComponent>
                  </PressableComponent>
                </Box>
              </Box>
            </Box>
            {/* <Box>
              <Box
                style={[
                  globalStyle.pt1p6,
                  globalStyle.w10,
                  globalStyle.flexrow,
                  globalStyle.justifyBetween,
                  globalStyle.alignItemsCenter,
                ]}
              >
                <Box
                  style={[globalStyle.flexrow, globalStyle.alignItemsCenter]}
                ></Box>
                <Box>
                  <PressableComponent onPress={() => {}}>
                    <TextComponent style={[globalStyle.textSecondary]}>
                      Forgot password?
                    </TextComponent>
                  </PressableComponent>
                </Box>
              </Box>
            </Box> */}
          </Box>
        </Box>
        <Box style={[globalStyle.pt3p2]}>
          <ButtonComponent
            loading={isLoading}
            title="Login"
            onPress={handleSubmit(logUserIn)}
          />
        </Box>
      </Box>
    </LayoutWithSafeArea>
  );
};

export default Loginscreen;
