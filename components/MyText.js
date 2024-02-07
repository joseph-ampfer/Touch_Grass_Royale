import { Component } from "react";
import { Text } from "react-native";

class MyText extends Component {
    render() {
        return (
            <Text style={{color: 'white'}}>{this.props.children}</Text>
        )
    }
}


export default MyText;
