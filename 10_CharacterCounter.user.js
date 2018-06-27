// ==UserScript==
// @name        NIM Series 10 - Character Counter
// @description 文字数を数えてくれるもの
// @author      yanorei32
// @supportURL  https://github.com/Yanorei32/nnn-improved/issues
// @namespace   http://tyan0.dip.jp/~rei/
// @website     http://tyan0.dip.jp/~rei/
// @include     https://www.nnn.ed.nico/contents/courses/*/chapters/*/essay_tests/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @updateURL   https://github.com/Yanorei32/nnn-improved/raw/master/10_CharacterCounter.user.js
// @version     0.1
// @grant       none
// @license     MIT License
// @run-at      document-idle
// ==/UserScript==

(() => {
    'use strict';

    let getReferenceCharacterCountByJapaneseText = (japaneseText) => {
        let referenceCharacterCountJapaneseText = japaneseText.match(/\d+字/)[0];

        if(referenceCharacterCountJapaneseText === undefined)
            return -1;

        let referenceCharacterCount = parseInt(referenceCharacterCountJapaneseText.slice(0, -1));

        return referenceCharacterCount;
    };

    let apply2counter = (characterCounterElement, answerTextAreaElement, referenceCharacterCount) => {
        let referenceCharacterCountMargin = referenceCharacterCount * 0.1;
        let answerTextAreaCharacterCount = answerTextAreaElement.val().length;

        if(answerTextAreaCharacterCount + referenceCharacterCountMargin < referenceCharacterCount)
            characterCounterElement.css({'color': 'blue'});
        else if(answerTextAreaCharacterCount - referenceCharacterCountMargin > referenceCharacterCount)
            characterCounterElement.css({'color': 'red'});
        else
            characterCounterElement.css({'color': 'green'});

        characterCounterElement.html(
            `${answerTextAreaCharacterCount}&nbsp;/&nbsp;${referenceCharacterCount}`
        );
    };

    $('<style>', {
        html: '.nim_series_character_counter_element { font-size: large; }'
    }).appendTo('body');

    $('li.exercise-item.type-descriptive').each((_, exerciseElement) => {
        let referenceCharacterCount = getReferenceCharacterCountByJapaneseText(
            $(exerciseElement).find('.question').eq(0).text()
        );

        if(referenceCharacterCount === -1)
            return true;

        let answerTextAreaElement = $(exerciseElement).find('.answers').eq(0);

        let characterCounterElement = $('<div>', {
            'class': 'nim_series_character_counter_element',
        }).insertBefore(answerTextAreaElement);

        apply2counter(
            characterCounterElement,
            answerTextAreaElement,
            referenceCharacterCount
        );

        answerTextAreaElement.on('keyup', (e) => {
            apply2counter(
                characterCounterElement,
                answerTextAreaElement,
                referenceCharacterCount
            );
        });
    });
})();
