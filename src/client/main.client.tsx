import Roact from '@rbxts/roact'

const Players = game.GetService('Players')
const LocalPlayer = Players.LocalPlayer!
const PlayerGui = LocalPlayer.FindFirstChildOfClass('PlayerGui')

interface HelloWorldState {
  currentTime: number
  running: boolean
}

interface HelloWorldProps {
  name: string
}

class HelloWorld extends Roact.Component<HelloWorldProps, HelloWorldState> {
  state = { currentTime: 0, running: false }

  public willUnmount = () => {
    this.setState({ running: false })
  }

  startTimer = () => {
    this.setState((prevState) => ({ ...prevState, running: true }))
    spawn(() => {
      while (this.state.running) {
        this.setState((prevState) => ({
          currentTime: prevState.currentTime + 1,
        }))
        wait(1)
      }
    })
  }

  stopTimer = () => {
    this.setState((prevState) => ({ ...prevState, running: false }))
  }

  toggleTimer = () => {
    this.state.running ? this.stopTimer() : this.startTimer()
  }

  public render(): Roact.Element {
    return (
      <screengui>
        <textlabel Key="TimeLabel" Size={new UDim2(0, 150, 0, 30)} Text={`Time Elapsed: ${this.state.currentTime}`} />
        <textbutton
          Key="TimeControl"
          Event={{ MouseButton1Down: this.toggleTimer }}
          Text={this.state.running ? 'Stop' : 'Start'}
          Size={new UDim2(0, 150, 0, 30)}
          Position={new UDim2(0, 0, 0, 45)}
        />
      </screengui>
    )
  }
}

Roact.mount(<HelloWorld name="React" />, PlayerGui, 'helloWorldGui')
