import {expect} from 'chai'
import jsdom from 'jsdom'
import pug from 'pug'
const {JSDOM} = jsdom

describe('index.pug', function() {
  it('should say hello', function(done) {
    let index = new JSDOM(pug.renderFile('./ui/pages/library/index.pug'))
    let h1 = index.window.document.querySelector('h1').textContent
    expect(h1).to.equal('this is heading')
    done()
    window.close()
  })
})
