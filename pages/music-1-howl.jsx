import React from "react";
import Player from "../components/AudioPlayer/Player";
import { Spin, Icon } from "antd";

class Music extends React.Component {
  state = {
    items: null,
    error: null,
    howlerActiveUrl: null,
    howlerActiveId: 0,
    isFetchingSongs: false,
    searchFocused: false,
    touchMove: false,
    activeTag: "Minimal",
    authUser: null,
  };

  render() {
    const {
      items,
      howlerActiveUrl,
      isFetchingSongs,
      searchFocused,
      howlerTrackImg,
      howlerTractTitle,
      isLoading,
      error,
      activeTag,
      authUser,
    } = this.state;

    return (
      <div>
        <h1>Stuff</h1>
      </div>
    );
  }
}

export default Music;
