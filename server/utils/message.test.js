var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let from = 'Admin'
    let latitude = 15
    let longitutde = 15
    let url = 'http://www.google.com/maps?q=15,15'
    let location = generateLocationMessage(from, latitude, longitutde)

    expect(location.createdAt).toBeA('number')
    expect(location).toInclude({from, url})
  })
})