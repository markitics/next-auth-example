import React from "react";
import ReactHowler from "react-howler";
import AudioControls from "./AudioControls";
import Volume from "./Volume";
import Progress from "./Progress";
import AudioNotFound from "./music.svg";
import TracksList from "./TracksList";

class AudioPlayer extends React.Component {
  state = {
    duration: null,
    howlerPlaying: false,
    activeId: 0,
    volume: 0.3,
    mobileAudioPlayerOpen: false,
    titleWidth: null,
    scrolling: false,
    scrollY: null,
    error: null,
    volumeOff: false,
    repeatSong: false,
    firstMusicPlay: false,
  };

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    this.updateWidth();
    if (this.state.howlerActiveUrl !== prevState.howlerActiveUrl) {
      this.setState({ played: 0, howlerLoad: false, progress: 0 });
    }
  }

  updateWidth() {
    if (this.input.clientWidth) {
      const width = this.input.clientWidth;
      if (this.state.titleWidth !== width) {
        this.setState({ titleWidth: this.input.clientWidth });
      }
    }
  }

  componentDidMount() {
    this.updateWidth();
    this.updateWindowSize();
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.updateWindowSize);
  }

  handleScroll = () => {
    console.log(window.scrollY);
    if (window.scrollY !== 0) {
      this.setState((state) => {
        return { scrolling: true };
      });
    }
  };
  updateWindowSize = () => {
    this.setState((state) => {
      return {
        width: window.innerWidth,
      };
    });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.interval2);
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.updateWindowSize);
  }
  ref = (player) => {
    this.player = player;
  };
  onSeekChange = (e) => {
    console.log("change");
    clearInterval(this.interval);
    clearInterval(this.interval2);
    this.setState((state) => {
      return {
        progress: parseFloat(e),
        seeking: !state.seeking,
        event: "SeekOnChange",
      };
    });

    if (this.player && this.player.howlerState() === "loaded") {
      this.player.seek(e * this.state.duration);
      this.interval2 = setInterval(() => {
        this.setState((state) => {
          return {
            played: Math.floor(this.player.seek()),
            progress: +(this.player.seek() / this.player.duration()).toFixed(3),
            seeking: false,
            event: "SeekMouseUp",
          };
        });
      }, 1000);
    }
  };

  howlerStart = (url, i, img, title) => {
    const { volume, volumeOff, prevVol } = this.state;
    console.log(this.player && this.player.howlerState() === "loaded");
    this.setState((state) => {
      if (state.howlerPlaying) {
      } else {
        this.interval = setInterval(() => {
          this.setState({
            played: this.player.seek() ? Math.floor(this.player.seek()) : null,
            progress: this.player.seek() / this.player.duration(),
          });
        }, 1000);
        !this.state.activeUrl &&
          this.setState({
            activeUrl: this.props.howlerActiveUrl,
            activeTrackTitle: this.props.howlerTractTitle,
            activeImg: this.props.howlerTrackImg,
          });
      }
      return {
        howlerPlaying: true,
        howlerEnd: false,
        firstMusicPlay: true,
      };
    });

    console.log(this.state);
  };

  howlerPlay = (url, i, img, title) => {
    // const { volume, volumeOff, prevVol } = this.state;
    let promise = new Promise((resolve, reject) => {
      // переведёт промис в состояние fulfilled с результатом "result"
      resolve(
        this.setState((state) => {
          return {
            activeUrl: url + "?client_id=ca1f6b04464964bb9ed82eaa129f5cc7",
            activeId: i,
            activeImg: img,
            activeTrackTitle: title,
            highLightedUrl: url,
          };
        })
      );
    });
    promise.then((result) => this.howlerStart(url, i, img, title));
  };

  howlerPause = () => {
    clearInterval(this.interval);
    clearInterval(this.interval2);

    this.setState(() => {
      return { howlerPlaying: false };
    });
  };

  nextSong = () => {
    const { howlerPlaying } = this.state;
    if (this.state.activeId < this.props.items.length - 1) {
      this.setState((state) => {
        return {
          activeId: state.activeId + 1,
          activeUrl:
            this.props.items[this.state.activeId + 1].stream_url +
            "?client_id=ca1f6b04464964bb9ed82eaa129f5cc7",
          activeImg:
            this.props.items[this.state.activeId + 1].artwork_url &&
            this.props.items[this.state.activeId + 1].artwork_url.replace(
              /large/gi,
              "crop"
            ),
          activeTrackTitle: this.props.items[this.state.activeId + 1].title,
          highLightedUrl: this.props.items[this.state.activeId + 1].stream_url,
        };
      });
    } else {
      this.setState((state) => {
        return {
          activeId: 0,
          activeUrl: this.props.items[0].stream_url,
          activeImg:
            this.props.items[0].artwork_url &&
            this.props.items[0].artwork_url.replace(/large/gi, "crop"),
          activeTrackTitle: this.props.items[0].title,
          highLightedUrl: this.props.items[0].stream_url,
        };
      });
    }
  };

  prevSong = () => {
    const { howlerPlaying } = this.state;

    if (this.state.activeId === 0) {
      this.setState((state) => {
        return {
          activeId: this.props.items.length - 1,
          activeUrl: this.props.items[this.props.items.length - 1].stream_url,
          activeImg:
            this.props.items[this.props.items.length - 1].artwork_url &&
            this.props.items[this.props.items.length - 1].artwork_url.replace(
              /large/gi,
              "crop"
            ),
          activeTrackTitle: this.props.items[this.props.items.length - 1].title,
          highLightedUrl: this.props.items[this.props.items.length - 1]
            .stream_url,
        };
      });
    } else {
      this.setState((state) => {
        return {
          activeId: state.activeId - 1,
          activeUrl: this.props.items[this.state.activeId - 1].stream_url,
          activeImg:
            this.props.items[this.state.activeId - 1].artwork_url &&
            this.props.items[this.state.activeId - 1].artwork_url.replace(
              /large/gi,
              "crop"
            ),
          activeTrackTitle: this.props.items[this.state.activeId - 1].title,
          highLightedUrl: this.props.items[this.state.activeId - 1].stream_url,
        };
      });
    }
  };

  setVolume = (e) => {
    this.setState({ volume: parseFloat(e) });
  };

  muteVolume = () => {
    if (!this.state.volumeOff) {
      this.setState({ volumeOff: true, volume: 0, prevVol: this.state.volume });
    } else {
      this.setState({ volumeOff: false, volume: this.state.prevVol });
    }
  };

  howlerDuration = () => {
    this.setState({
      howlerLoad: true,
      duration: Math.floor(this.player.duration()),
    });
  };
  howlerEnd = () => {
    this.props.items.length !== 0 && !this.state.repeatSong
      ? this.nextSong()
      : null;
  };

  toMinutes = (s) => {
    if (s < 60) {
      if (s < 10) {
        return 0 + ":0" + Math.floor(s);
      }
      return 0 + ":" + Math.floor(s);
    } else {
      const min = Math.floor(s / 60);
      let sec = Math.floor(s % 60);
      // sec === 0 ? (sec = "0") : sec;
      if (sec < 10) {
        return min + ":0" + sec;
      }
      return min + ":" + sec;
    }
  };
  highLightUrl = (url) => {
    this.setState({ highLightedUrl: url });
  };
  render() {
    const {
      volumeOff,
      titleWidth,
      highLightedUrl,
      repeatSong,
      firstMusicPlay,
      width,
      mobileAudioPlayerOpen,
      duration,
      progress,
      howlerPlaying,
      played,
      howlerLoad,
      activeId,
      activeTrackTitle = this.props.items &&
        this.props.items.length !== 0 &&
        this.props.items[0].title,
      activeImg = this.props.items &&
        this.props.items.length !== 0 &&
        this.props.items[0].artwork_url &&
        this.props.items[0].artwork_url.replace(/large/gi, "crop"),
      volume,
      activeUrl = this.props.items &&
        this.props.items.length !== 0 &&
        this.props.items[0].stream_url,
    } = this.state;
    const {
      items,
      howlerActiveUrl,
      searchFocused,
      howlerTrackImg,
      howlerTractTitle,
    } = this.props;
    return (
      <React.Fragment>
        <ReactHowler
          src={activeUrl ? activeUrl : howlerActiveUrl}
          html5={true}
          ref={this.ref}
          volume={volume}
          mute={volumeOff}
          loop={repeatSong}
          playing={howlerPlaying}
          onLoad={this.howlerDuration}
          onPlay={this.howlerStart}
          onEnd={this.howlerEnd}
        />
        <div
          className="audio-player-container"
          style={
            width < 600 && searchFocused
              ? { display: "none" }
              : { padding: "0", paddingLeft: "0px" }
          }
        >
          <AudioControls
            prevSong={items.length !== 0 ? this.prevSong : null}
            nextSong={items.length !== 0 ? this.nextSong : null}
            howlerPlaying={howlerPlaying}
            howlerStart={this.howlerStart}
            howlerPause={this.howlerPause}
          />
          {width < 600 ? null : (
            <i
              className={
                width <= 700 && mobileAudioPlayerOpen
                  ? "fas fa-redo-alt play-pause-controls infinity-mobile-view"
                  : "fas fa-redo-alt play-pause-controls infinity"
              }
              title="Repeat"
              style={
                repeatSong
                  ? { color: "blue", marginLeft: "0" }
                  : { marginLeft: "0" }
              }
              onClick={() =>
                this.setState((state) => {
                  return {
                    repeatSong: !state.repeatSong,
                  };
                })
              }
            />
          )}
          <Progress
            progress={progress}
            howlerLoad={howlerLoad}
            onSeekChange={this.onSeekChange}
            played={played}
            toMinutes={this.toMinutes}
            duration={duration}
            width={width}
          />
          <div
            onClick={() =>
              this.setState((state) => {
                return { mobileAudioPlayerOpen: !state.mobileAudioPlayerOpen };
              })
            }
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            className="audio-track-info"
          >
            <img
              src={activeImg ? activeImg : AudioNotFound || howlerTrackImg}
              alt="track-img"
              style={{ width: "45px", height: "45px", borderRadius: "3px" }}
            />
            <div
              style={
                width < 600 ? { overflow: "hidden", width: "150px" } : null
              }
            >
              <h5
                ref={(node) => {
                  this.input = node;
                }}
                style={
                  width < 600
                    ? {
                        margin: "5px",
                        width: "max-content",
                        padding: "5px",
                      }
                    : { padding: "5px" }
                }
              >
                {activeTrackTitle || howlerTractTitle}
              </h5>
            </div>
            {this.state.titleWidth > 150 && width < 600 ? (
              <h5 style={{ marginBottom: "0" }}>...</h5>
            ) : null}
          </div>
          <i
            className="fas fa-plus play-pause-controls"
            style={{ margin: "0" }}
          />
          <Volume
            setVolume={this.setVolume}
            volume={volume}
            mobileAudioPlayerOpen={mobileAudioPlayerOpen}
            width={width}
            muteVolume={this.muteVolume}
            volumeOff={volumeOff}
          />
        </div>
        {mobileAudioPlayerOpen && (
          <div className="mobile-audio-player">
            <i
              className="fas fa-arrow-left play-pause-controls"
              style={{
                position: "absolute",
                top: "1%",
                left: "2%",
                fontSize: "30px",
              }}
              onClick={() =>
                this.setState((state) => {
                  return {
                    mobileAudioPlayerOpen: !state.mobileAudioPlayerOpen,
                  };
                })
              }
            />
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "70px",
                width: "90%",
              }}
              className="mobile-audio-player-container"
            >
              <img
                src={activeImg ? activeImg : AudioNotFound || howlerTrackImg}
                style={{ maxWidth: "95%", height: "fit-content" }}
                alt="track-img"
              />

              {width > 700 ? null : (
                <Progress
                  progress={progress}
                  howlerLoad={howlerLoad}
                  onSeekChange={this.onSeekChange}
                  played={played}
                  toMinutes={this.toMinutes}
                  duration={duration}
                  mobileAudioPlayerOpen={mobileAudioPlayerOpen}
                  width={width}
                />
              )}
              <div
                style={
                  titleWidth > 200
                    ? {
                        overflow: "hidden",
                        width: "285px",
                        height: "6em",
                        position: "relative",
                      }
                    : { height: "6em", display: "flex", alignItems: "center" }
                }
              >
                <h4
                  className={
                    titleWidth > 200 ? "mobile-activeTrackTitle" : null
                  }
                  style={{ margin: "15px", fontWeight: "bold" }}
                >
                  {activeTrackTitle || howlerTractTitle}
                </h4>
              </div>
            </div>
            <div
              className="audio-player-container"
              style={
                width > 1000
                  ? {
                      width: "70%",
                      background: "white",
                      borderTop: "none",
                      height: "77px",
                    }
                  : {
                      width: "100%",
                      background: "white",
                      borderTop: "none",
                      height: "77px",
                    }
              }
            >
              <AudioControls
                prevSong={items.length !== 0 ? this.prevSong : null}
                nextSong={items.length !== 0 ? this.nextSong : null}
                howlerPlaying={howlerPlaying}
                howlerStart={this.howlerStart}
                howlerPause={this.howlerPause}
              />

              {width > 700 ? (
                <Progress
                  progress={progress}
                  howlerLoad={howlerLoad}
                  onSeekChange={this.onSeekChange}
                  played={played}
                  toMinutes={this.toMinutes}
                  duration={duration}
                  mobileAudioPlayerOpen={mobileAudioPlayerOpen}
                  width={width}
                />
              ) : null}
              <Volume
                setVolume={this.setVolume}
                volume={volume}
                mobileAudioPlayerOpen={mobileAudioPlayerOpen}
                width={width}
                muteVolume={this.muteVolume}
                volumeOff={volumeOff}
              />
              <i
                className="fas fa-plus play-pause-controls"
                style={
                  width <= 700
                    ? {
                        position: "absolute",
                        right: "4%",
                        bottom: "59%",
                      }
                    : null
                }
              />
              <i
                className={
                  width <= 700 && mobileAudioPlayerOpen
                    ? "fas fa-redo-alt play-pause-controls infinity-mobile-view"
                    : "fas fa-redo-alt play-pause-controls infinity"
                }
                style={repeatSong ? { color: "blue" } : null}
                title="Repeat"
                onClick={() =>
                  this.setState((state) => {
                    return {
                      repeatSong: !state.repeatSong,
                    };
                  })
                }
              />
            </div>
          </div>
        )}
        <div
          className="audio-track-list-container"
          style={
            mobileAudioPlayerOpen ? { display: "none" } : { display: "flex" }
          }
        >
          <div className="audio-tracks-list">
            {items && (
              <TracksList
                items={items}
                toMinutes={this.toMinutes}
                howlerPause={this.howlerPause}
                howlerPlay={this.howlerPlay}
                howlerPlaying={howlerPlaying}
                width={width}
                activeUrl={activeUrl}
                highLightedUrl={highLightedUrl}
                toHighlightUrl={this.highLightUrl}
                firstMusicPlay={firstMusicPlay}
              />
            )}
          </div>
        </div>
        {items && items.length === 0 && <div>nothing found</div>}
      </React.Fragment>
    );
  }
}

export default AudioPlayer;
