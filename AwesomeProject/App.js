import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar, TextInput, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigatior, createStackNavigator } from "react-navigation";

//Stackのためのアイテムを用意
const stackItem = [
  {
    key: "stack1",
    name: "Stack1",
    body: "Stack1 Body"
  },
  {
    key: "stack2",
    name: "Stack2",
    body: "Stack Body"
  },
  {
    key: "stack3",
    name: "Stack3",
    body: "Stack3 Body"
  }
];

/*======================================
 *1つ目のタブに表示するコンポーネントを定義
 *StackNavigatorを入れ子にする
 *======================================*/

const Tab1 = ({ navigation }) => (
  <View style={style.container}>
    <FlatList
      data={stackItem}
      renderItem={({ item }) => (
        <TouchableOpacity key={item.key} style={listStyle.listItem} onPress={() => navigation.navigate("Detail", item)}>
          <Text style={{ fontSize: 24 }}>{item.name}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={listStyles.container}
    />
  </View>
);
Tab1.navigationOptions = {
  title: "Tab1"
};

//タップした時の移動先コンポートネントを定義
const DetailScreen = ({ navigation }) => (
  <View style={detailStyles.container}>
    <Text style={detailStyles.name}>{navigation.state.params.name}</Text>
    <Text style={dataStyles.body}>{navigation.state.params.body}</Text>
  </View>
);
DetailScreen.navigationOptions = {
  title: "Stack詳細"
};

const TabwithStack = createStackNavigator(
  {
    List: { screen: Tab1 },
    Detail: { screen: DetailScreen }
  },
  {
    initialRouteName: "List"
  }
);

/*======================================
 *　2つ目のタブに表示するコンポーネントを定義
 * =====================================*/

const Tab2 = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Tab2</Text>
  </View>
);
Tab2.navigationOptions = {
  title: "Tab2"
};

const Tab2withHeader = createStackNavigator(
  {
    Tab2: { screen: Tab2 }
  },
  {
    initialRouteName: "Tab2"
  }
);

const Tab3 = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Tab3</Text>
  </View>
);
Tab3.navigationOptions = {
  title: "Tab3"
};

const Tab3withHeader = createStackNavigator(
  {
    Tab3: { screen: Tab3 }
  },
  {
    initialRouteName: "Tab3"
  }
);

/*=================================
 * Bottomtabにそれぞれコンポーネントを紐図ける
 * =================================*/

export default createBottomTabNavigatior(
  {
    Tab1: {
      screen: Tab1withStack,
      navigationOptions: {
        title: "Tab1",
        tabBarIcon: ({ tintColor, focused }) => <Icon size={20} name="star" color="#999" />
      }
    },
    Tab2: {
      screen: Tab2withHeader,
      navigationOptions: {
        title: "Tab2",
        tabBarIcon: ({ tintColor, focused }) => <Icon size={20} name="star" color="#999" />
      }
    },
    Tab3: {
      screen: Tab3withHeader,
      navigationOptions: {
        title: "Tab3",
        tabBarIcon: ({ tintColor, focused }) => <Icon size={20} name="star" color="#999" />
      }
    }
  },
  {
    initialRouteName: "Tab1"
  }
);

//以下スタイルの定義

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    alignItems: "center",
    justifyContent: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

const listStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingHorizontal: 16
  },
  listItem: {
    marginVertical: 12
  }
});

const datailStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  name: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#000"
  },
  body: {
    fontSize: 18,
    color: "#737373"
  }
});
