abstract class VideoState {
  protected videoPlayer: VideoPlayer;

  setContext(context: VideoPlayer) {
    this.videoPlayer = context;
    this.init();
  }

  abstract init(): void;
  abstract play(): void;
  abstract stop(): void;
}

class Ready extends VideoState {
  init(): void {
    console.log('init Ready');
    this.videoPlayer.isPlaying = false;
    this.videoPlayer.position = 0;
  }

  public play() {
    console.log('start');
    this.videoPlayer.setState(new PlayingState());
  }

  public stop() {}
}

class PlayingState extends VideoState {
  init(): void {
    console.log('init PlayingState');
    this.videoPlayer.isPlaying = true;
  }

  public play() {}

  public stop() {
    console.log('Stop video!');
    this.videoPlayer.setState(new PausedState());
  }
}

class PausedState extends VideoState {
  init(): void {
    console.log('init PausedState');
    this.videoPlayer.isPlaying = false;
  }

  public play() {
    console.log('start');
    this.videoPlayer.setState(new Ready());
  }

  public stop() {}
}

class VideoPlayer {
  private state: VideoState;

  isPlaying: boolean;
  position: number;

  constructor(initialState: VideoState) {
    this.setState(initialState);
  }

  setState(state: VideoState) {
    this.state = state;
    this.state.setContext(this);
    this.state.init();
  }

  public play(): void {
    this.state.play();
  }

  public stop(): void {
    this.state.stop();
  }
}

// todo: video player starts with a video at position 0 ready to play
const videoPlayer = new VideoPlayer(new Ready());

// todo: if ready: play the video
videoPlayer.play();

// todo: if already playing: do nothing
videoPlayer.play();

// todo: if was playing: stop the video at current position (pause)
videoPlayer.stop();

// todo: if paused: return to start position
videoPlayer.stop();
