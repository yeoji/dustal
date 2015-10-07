import urllib.request
from bs4 import BeautifulSoup
import re


f = urllib.request.urlopen("http://www.emoji-cheat-sheet.com/")
html = f.read()
f.close()

soup = BeautifulSoup(html, 'html.parser')

f = open('emoji-cheatsheet', 'w')
reg = re.compile("graphics/emojis/([a-z0-9_-]+).png")

spans = soup.find_all('span')
for spanTag in spans:
    dataSrc = spanTag.get('data-src')

    if(dataSrc is not None):
        emoji = re.findall(reg, dataSrc)[0]
        if(emoji == ''):
            print('Could not get regex here: ' + dataSrc)
        else:
            emoji = ':' + emoji + ':'
            f.write(emoji + '\n')

f.close()



