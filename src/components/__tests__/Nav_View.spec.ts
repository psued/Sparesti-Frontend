import { shallowMount } from '@vue/test-utils';
import Nav_View from '@/views/Nav_View.vue';
import { describe, it, expect} from 'vitest'

describe('Nav_View', () => {
    it('renders the top bar with the logo', () => {
        const wrapper = shallowMount(Nav_View);
        const topBar = wrapper.find('.top-bar');
        const logo = wrapper.find('.logo');

        expect(topBar.exists()).toBe(true);
        expect(logo.exists()).toBe(true);
    });

    it('renders the hamburger menu', () => {
        const wrapper = shallowMount(Nav_View);
        const hamburger = wrapper.find('.hamburger');

        expect(hamburger.exists()).toBe(true);
    });

    it('renders the sidebar when it is open', async () => {
        const wrapper = shallowMount(Nav_View);
        const hamburgerbox = wrapper.find('.hamburger-box');
        await hamburgerbox.trigger('click');

        const sidebar = wrapper.findComponent({ name: 'sidebar' });
        expect(sidebar.exists()).toBe(true);
    });
    it('renders the phone bar for mobile devices', () => {
        const wrapper = shallowMount(Nav_View);
        const phoneBar = wrapper.find('.phone-bar');
        expect(phoneBar.exists()).toBe(false);
    });

    it('toggles the sidebar visibility when the hamburger menu is clicked', async () => {
        const wrapper = shallowMount(Nav_View);
        const hamburgerbox = wrapper.find('.hamburger-box');

        await hamburgerbox.trigger('click');

        const sidebar = wrapper.findComponent({ name: 'sidebar' });
        expect(sidebar.exists()).toBe(true);

        await hamburgerbox.trigger('click');

        expect(sidebar.exists()).toBe(false);
    });
});
