import React,{ useEffect, useRef, useState } from 'react'

const useMultiple = (result) => {

    const checkKey = result && Object.keys(result)[0];

    const filterDur = (checkKey !== 'msg') && result && result.Duration.filter(item => {
        return item.selection == '1'
    })
    
    const fiternames = [];
    const MulDaySH = [];
    const MulDayFH = [];
    for(var i in filterDur) {
        fiternames.push(filterDur[i].Id)
        filterDur[i].MultipleDayDuration.filter(item => {
            if((item.selection == '1' && item.Id == 'MultipleDaySecondHalf') || item.Id == 'MultipleFullDay') {
                MulDaySH.push(item.Id)
            }
            if((item.selection == '1' && item.Id == 'MultipleDayFirstHalf') || item.Id == 'MultipleFullDay') {
                MulDayFH.push(item.Id)
            }
        })
    }

    return {
        fiternames, MulDaySH, MulDayFH, checkKey
    }
}

export default useMultiple;