// Copyright 2021 Google LLC
//
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file or at
// https://developers.google.com/open-source/licenses/bsd
// js for popup after clicking the extension action icon
// popup画面内で完結させる

NUM_RECENT_ITEMS = 50;
var list_area = document.getElementById('recent-bookmark-list');
var exec_btn = document.getElementsByTagName('button');
console.log("hello from popup.js");
function dumpBookmarks(query) {
    var bookmarkTreeNodes = chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
      //$('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query));
      console.log('bookmarkTreeNodes:\n');
      console.log(bookmarkTreeNodes);
    });
  }

function dumpRecentBookmarks() {
    var recentBookmarks = chrome.bookmarks.getRecent(NUM_RECENT_ITEMS, function(recentBookmarks) {
      console.log('raw recent:', recentBookmarks);
    });
    
}

function getRecentBookmarks() {
    // get recent bookmarks URLs and thier titles
    var recents = new Array;
    var recentsURLs = new Array;
    var recentBookmarks = chrome.bookmarks.getRecent(NUM_RECENT_ITEMS, function(recentBookmarks) {
        recentBookmarks.forEach(ele => {
            recents.push(ele);
        })
    console.log(recents);
    recents.forEach(ele => {
        // extract URLs and titles
        recentsURLs.push([ele['title'], ele['url']])
    })
    console.log(recentsURLs);
      });
}

function showRecentBookmarks() {
    // show obj in arr at HTML div
    var recentBookmarks = chrome.bookmarks.getRecent(NUM_RECENT_ITEMS, function(recentBookmarks) {
        recentBookmarks.forEach(ele => {
            Object.keys(ele).forEach(key => {
                list_area.innerHTML += `${key}: ${ele[key]}</br>`;
            })
            list_area.innerHTML += '</br></br>';
        })
      });
}

document.addEventListener('DOMContentLoaded', function () {
    query = "wiki";
    dumpBookmarks(query);
    dumpRecentBookmarks();
    showRecentBookmarks();
    getRecentBookmarks();
  });