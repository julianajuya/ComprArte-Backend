const { expect } = require('chai');
const sinon = require('sinon');
const { google } = require('googleapis');
const controller = require('../controllers/autenticationDrive');

describe('Google Drive Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should obtain Google access token successfully', async () => {
    const mockGetClient = sinon.stub().resolves({
      getAccessToken: sinon.stub().resolves({ token: 'mockAccessToken' })
    });
    sinon.replace(google.auth, 'GoogleAuth', sinon.stub().returns({
      getClient: mockGetClient
    }));

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await controller.getGoogleToken(req, res);

    expect(res.status.calledOnceWith(200)).to.be.true;
  });
});

