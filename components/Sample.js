import React, {Component} from 'react';
import { Window } from "@progress/kendo-react-dialogs";
import Videocall from '../components/videocall';

class Sample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            windowStage: "MINIMIZED"
        };
    }

    setMinimize = () => {
        this.setState({
            windowStage: "MINIMIZED"
        });
    }
    setFullscreen = () => {
        this.setState({
            windowStage: "FULLSCREEN"
        });
    }
    setDefault = () => {
        this.setState({
            windowStage: "DEFAULT"
        });
    }
    handleStageChange = (e)=>{
        this.setState({
            windowStage: e.state
        });
    }

    render() {
        return (
                <div>
                    <Window title={"Status"} stage={this.state.windowStage} onStageChange={this.handleStageChange}>
                    <Videocall />
                    </Window>
                </div>
        );
    }
}
export default Sample;