import { shallowMount } from '@vue/test-utils';
import RoadTiles from '@/components/road/RoadTiles.vue';
import { describe, it, expect } from 'vitest';

describe('RoadTiles', () => {
  it('renders road tiles correctly', () => {
    describe('RoadTiles', () => {
      it('renders road tiles correctly', () => {
        const wrapper = shallowMount(RoadTiles);
        expect(wrapper.find('.road-container').exists()).toBe(true);
        expect(wrapper.find('.road-box').exists()).toBe(true);
        expect(wrapper.findAll('.road-tile').length).toBe(0); 
      });
    });
  })
});
