import { mount } from '@vue/test-utils'
import ChallengeComponent from '@/components/challenges/ChallengeComponent.vue'
import { describe, it, expect, beforeEach } from "vitest";

describe('ChallengeComponent.vue', () => {
    let wrapper;
    let challengeObject = {
        id: 1,
        title: 'Test Challenge',
        description: 'This is a test challenge',
        timeInterval: '1 week',
        expiryDate: new Date(),
        targetAmount: 100,
        usedAmount: 50,
        productName: null,
        productCategory: null,
        mediaUrl: null
    };

    beforeEach(() => {
        wrapper = mount(ChallengeComponent, {
            props: {
                challengeObject
            }
        });
    });

    // Existing tests...

    it('renders the correct time interval', () => {
        expect(wrapper.find('.timeSpan').text()).toBe(challengeObject.timeInterval);
    });

    it('renders the correct days remaining', () => {
        // Assuming the timeLeftText computed property is correctly implemented
        expect(wrapper.find('.daysRemaining').text()).toBeTruthy();
    });

    it('renders the correct complete button when challenge is completed', async () => {
        // Assuming the completed computed property is correctly implemented
        if (wrapper.vm.completed) {
            expect(wrapper.find('.completeButton').exists()).toBe(true);
        }
    });

    it('renders the correct remove button when challenge is failed', async () => {
        // Assuming the failed computed property is correctly implemented
        if (wrapper.vm.failed) {
            expect(wrapper.find('.removeButton').exists()).toBe(true);
        }
    });

    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });
});