import TrackPlayer from 'react-native-track-player';
export async function playbackService() {
  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.destroy();
  });
  TrackPlayer.addEventListener('playback-track-changed', async data => {
    const queue = await TrackPlayer.getQueue();
    const currentTrack = await TrackPlayer.getCurrentTrack();
    console.log('Track changed', queue[currentTrack]);
  });
}
