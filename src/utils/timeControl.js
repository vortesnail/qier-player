// 计算百分比*总时间（元数据）
export function percentToSeconds(percent, time_seconds) {
  const currentTime = percent * time_seconds;
  return currentTime;
}

// 将以 (秒) 显示的格式 -> 以 (分:秒) 显示
export function secondsToMinutesAndSecondes(time_seconds) {
  const m = Math.floor(time_seconds / 60);
  const s = Math.floor(time_seconds % 60);

  const minutes = m.toString().length > 1 ? m.toString() : ('0' + m.toString()); 
  const seconds = s.toString().length > 1 ? s.toString() : ('0' + s.toString()); 

  return minutes + ':' + seconds;
}

// 计算百分比*总时间并以 (分:秒) 显示
export function percentToMinutesAndSeconds(percent, time_seconds) {
  const currentTime = percent * time_seconds;
  const m = Math.floor(currentTime / 60);
  const s = Math.floor(currentTime % 60);

  const minutes = m.toString().length > 1 ? m.toString() : ('0' + m.toString()); 
  const seconds = s.toString().length > 1 ? s.toString() : ('0' + s.toString()); 

  return minutes + ':' + seconds;
}

