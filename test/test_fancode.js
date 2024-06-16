import { expect } from 'chai';
import { getFanCodeUsersWithCompletionPercentages } from '../src/main.js';

describe('FanCode Users', function() {
    it('should have more than 50% tasks completed', async function() {
        const fanCodeUsers = await getFanCodeUsersWithCompletionPercentages();
        fanCodeUsers.forEach(user => {
            expect(user.completionPercentage).to.be.greaterThan(50, `${user.username} does not have more than 50% tasks completed`);
        });
    });
});
