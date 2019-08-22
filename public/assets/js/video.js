var vPlayer = videojs('material-video');
var timer;
var trackingTimes = [];
var startOverlapFlag = false;
var endOverlapFlag = false;
var currentTrackerIndex = 0;
vPlayer.on('play', function(){
    updateStartTime()
    track();
})

vPlayer.on('pause', function(){
    updateEndTime()
    pause();
})

function track(){
    timer = setInterval(updateEndTime, 440)
}

function pause(){
    clearInterval(timer);
}

function updateStartTime() {
    let currentTime = vPlayer.currentTime()
    for( let i = 0 ; i < trackingTimes.length; i++ ){
        if( trackingTimes[i][0] <= currentTime && currentTime <= trackingTimes[i][1] + 1 ){
            currentTrackerIndex = i;
            startOverlapFlag = true;
            return;
        }
    }
    trackingTimes.push([currentTime])
    currentTrackerIndex = trackingTimes.length - 1; 
    startOverlapFlag = false;
}

function updateEndTime(){
    let currentTime = vPlayer.currentTime()
    if( trackingTimes[currentTrackerIndex][1] != null && trackingTimes[currentTrackerIndex][1] != undefined && trackingTimes[currentTrackerIndex][1] < currentTime - 0.6) {
        return;
    }
    if( startOverlapFlag == false ){
        // TODO : Can update the start index as current tracker
        for( let i = 0 ; i < trackingTimes.length; i++ ){
            if( trackingTimes[i][1] ){
                if( trackingTimes[i][0] <= currentTime && currentTime <= trackingTimes[i][1] ){
                    trackingTimes[currentTrackerIndex][1] = trackingTimes[i][1]
                    trackingTimes.splice(i, 1);
                    return;
                }
            }            
        }
        if( trackingTimes[currentTrackerIndex][1] != null && trackingTimes[currentTrackerIndex][1] != undefined ){
                trackingTimes[currentTrackerIndex][1] =  currentTime
        }
        else{
            trackingTimes[currentTrackerIndex].push(currentTime)
        }
  
    }
    else {
        if( currentTime <= trackingTimes[currentTrackerIndex][1] ){
            return;
        }
        else {
            for( let i = 0 ; i < trackingTimes.length; i++ ){
                if( i != currentTrackerIndex && trackingTimes[i][1] ){
                    if( trackingTimes[i][0] <= currentTime && currentTime <= trackingTimes[i][1] ){
                        trackingTimes[currentTrackerIndex][1] = trackingTimes[i][1]
                        trackingTimes.splice(i, 1);
                        return;
                    }
                }
            }
            if( trackingTimes[currentTrackerIndex][1] != null && trackingTimes[currentTrackerIndex][1] != undefined ){
                trackingTimes[currentTrackerIndex][1] =  currentTime
            }
            else{
                trackingTimes[currentTrackerIndex].push(currentTime)
            }
        }
    }
}