import { TestBed } from '@angular/core/testing';
import { CoursService } from './cours.service';
describe('CoursService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(CoursService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=cours.service.spec.js.map