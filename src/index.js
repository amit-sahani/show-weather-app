import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import "semantic-ui-css/semantic.min.css";
import Spinner from './Spinner';

// const App = () => {
//     async function getGeoLoc(){
//         let loc = await new Promise((resolve, reject) =>  window.navigator.geolocation.getCurrentPosition(resolve, reject));
//         console.log(loc );
//     }
//     try {
//         getGeoLoc();
//     } catch (error) {
//         console.log(error);
//     }


//     return (
//         <div>Latitude: </div>
//     );
// };

async function getGeoLoc(obj) {
    try {
        let loc = await new Promise((resolve, reject) => window.navigator.geolocation.getCurrentPosition(resolve, reject));
        console.log(loc);
        obj.setState({ lat: loc.coords.latitude })
    } catch (error) {
        obj.setState({errorMessage: error.message});
        console.log("This is error => " + error);
    }

}

class App extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { lat: null, errorMessage: "" };
    //     // window.navigator.geolocation.getCurrentPosition(
    //     //     position => { this.setState({lat: position.coords.latitude}) },
    //     //     err => console.log(err)
    //     // );

    // }

    state = { lat: null, errorMessage: ""}

    componentDidMount(){
        getGeoLoc(this);

    }

    renderContent(){
        if(this.state.lat && !this.state.errorMessage ){
            return <SeasonDisplay {...this.state} />
            //<div><b>Location: </b>{ this.state.lat}</div>
        }
        if(!this.state.lat && this.state.errorMessage ){
            return <div><b>Error: </b> { this.state.errorMessage}</div>
        }
        
        return <Spinner message="Please select the location." />
 
    };


    render() {

        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        );

        // return (
        //     <div>{ this.state.lat ?
        //         ( <>Latitude: {this.state.lat} 
        //         <br/> </>) :
        //         ( <>Error: {this.state.errorMessage} </>)
        //     }
        //     </div>
        // );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));