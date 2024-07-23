import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event,
} from 'react-native-track-player';
export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification, // dừng chạy nhạc và loại bỏ notify
        // AppKilledPlaybackBehavior.ContinuePlayback, // tiếp tục chạy đến hết bài nhạc.
      },
      capabilities: [
        Capability.Play, //bạn có thể tiếp tục
        Capability.Pause, //Tạm dừng chơi nhạc
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });
    isSetup = true;
  } finally {
    return isSetup;
  }
}
export async function addTracks(albumId = '1') {
  let tracks;
  if (albumId === '1') {
    tracks = [
      {
        id: '1',
        url: require('../Images/url1.mp3'),
        artwork: require('../Images/img1.png'),
        title: 'Nhạc Thiền 500 năm dưới Ngũ Hành Sơn',
        artist: 'duha.code',
      },
      {
        id: '2',
        url: require('../Images/url2.mp3'),
        artwork: require('../Images/img2.png'),
        title: 'Bản nhạc giúp ngủ ngon sau 15 phút',
        artist: 'duha.code',
      },
      {
        id: '3',
        url: require('../Images/url3.mp3'),
        artwork: require('../Images/img3.png'),
        title: 'Tịnh tâm - An nhiên tự',
        artist: 'duha.code',
      },
      {
        id: '4',
        url: require('../Images/url4.mp3'),
        artwork: require('../Images/img4.png'),
        title: 'Nhạc Thiền Thời Lượng 20 Phút',
        artist: 'duha.code',
      },
      {
        id: '5',
        url: require('../Images/url5.mp3'),
        artwork: require('../Images/img5.png'),
        title: 'NHẠC THIỀN YOGA THƯ GIÃN 20 PHÚT',
        artist: 'duha.code',
      },
      {
        id: '6',
        url: require('../Images/url6.mp3'),
        artwork: require('../Images/img6.png'),
        title: 'NHẠC THIỀN TĨNH TÂM DỄ NGỦ 30 Phút',
        artist: 'duha.code',
      },
    ];
  } else if (albumId === '2') {
    tracks = [
      {
        id: '1',
        url: require('../Images/url1.mp3'),
        artwork: require('../Images/img1.png'),
        title: 'Nhạc Thiền 500 năm dưới Ngũ Hành Sơn',
        artist: 'duha.code',
      },
      {
        id: '2',
        url: require('../Images/url2.mp3'),
        artwork: require('../Images/img2.png'),
        title: 'Bản nhạc giúp ngủ ngon sau 15 phút',
        artist: 'duha.code',
      },
      {
        id: '3',
        url: require('../Images/url3.mp3'),
        artwork: require('../Images/img3.png'),
        title: 'Tịnh tâm - An nhiên tự',
        artist: 'duha.code',
      },
      {
        id: '4',
        url: require('../Images/url4.mp3'),
        artwork: require('../Images/img4.png'),
        title: 'Nhạc Thiền Thời Lượng 20 Phút',
        artist: 'duha.code',
      },
      {
        id: '5',
        url: require('../Images/url5.mp3'),
        artwork: require('../Images/img5.png'),
        title: 'NHẠC THIỀN YOGA THƯ GIÃN 20 PHÚT',
        artist: 'duha.code',
      },
      {
        id: '6',
        url: require('../Images/url6.mp3'),
        artwork: require('../Images/img6.png'),
        title: 'NHẠC THIỀN TĨNH TÂM DỄ NGỦ 30 Phút',
        artist: 'duha.code',
      },
    ];
  }
  await TrackPlayer.add(tracks);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

// export async function playbackService() {
//   // Hàm này để sau khai báo các event điều khiển
//   // Các điều khiển dưới đây khai báo xong bạn có thể điều khiển ở phần notify trên điện thoại
//   TrackPlayer.addEventListener(Event.RemotePause, () => {
//     TrackPlayer.pause();
//   });
//   TrackPlayer.addEventListener(Event.RemotePlay, () => {
//     TrackPlayer.play();
//   });
//   TrackPlayer.addEventListener(Event.RemoteNext, () => {
//     TrackPlayer.skipToNext();
//   });
//   TrackPlayer.addEventListener(Event.RemotePrevious, () => {
//     TrackPlayer.skipToPrevious();
//   });
// }

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
